import os
import sys
import glob
import subprocess
import wave
import struct
import numpy as np
from PIL import Image

def find_input_video():
    mp4_files = [f for f in os.listdir('.') if f.endswith('.mp4') and not f.startswith('hero')]
    if not mp4_files:
        raise FileNotFoundError("No input mp4 video found in current directory.")
    return mp4_files[0]

def build_hero_assets():
    input_video = find_input_video()
    print(f"Using input video: {input_video}")

    os.makedirs('public/hero', exist_ok=True)
    os.makedirs('scripts/temp', exist_ok=True)

    # 1. Probe video
    probe_cmd = ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', input_video]
    duration = float(subprocess.check_output(probe_cmd).strip())
    print(f"Input video duration: {duration:.2f}s")

    # Target duration to take: min(10.0, duration)
    loop_duration = min(duration, 8.0)
    fade_duration = 0.5
    partA_start = fade_duration
    partA_duration = loop_duration - fade_duration # e.g. 7.5s
    partB_start = 0.0
    partB_duration = fade_duration # 0.5s

    # Crop and scale filter:
    # 848x1060 crop at (544, 10), scaled to 768x960, whitened background
    vf_base = "crop=848:1060:544:10,scale=768:960,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98"

    # Step 2: Audio cross-fade in numpy
    print("Extracting and cross-fading audio in numpy...")
    raw_audio_path = "scripts/temp/raw_audio.wav"
    subprocess.run([
        'ffmpeg', '-y', '-i', input_video, '-t', str(loop_duration),
        '-vn', '-acodec', 'pcm_s16le', '-ar', '48000', '-ac', '2', raw_audio_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    with wave.open(raw_audio_path, 'r') as w:
        num_frames = w.getnframes()
        rate = w.getframerate()
        channels = w.getnchannels()
        audio_bytes = w.readframes(num_frames)

    audio_samples = np.frombuffer(audio_bytes, dtype=np.int16).reshape(-1, channels)

    fade_samples = int(fade_duration * rate)
    partA_audio = audio_samples[fade_samples:int(loop_duration * rate)].copy()
    partB_audio = audio_samples[:fade_samples].copy()

    # Equal power cross-fade: Part A end fades into Part B start
    t = np.linspace(0, np.pi / 2, fade_samples)[:, np.newaxis]
    fade_out = np.cos(t)
    fade_in = np.sin(t)

    blended = (partA_audio[-fade_samples:].astype(np.float64) * fade_out +
               partB_audio[:fade_samples].astype(np.float64) * fade_in)
    partA_audio[-fade_samples:] = np.clip(blended, -32768, 32767).astype(np.int16)

    looped_audio_path = "scripts/temp/looped_audio.wav"
    with wave.open(looped_audio_path, 'w') as w:
        w.setnchannels(channels)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(partA_audio.tobytes())
    print("Audio cross-fade complete.")

    # Step 3: Video crossfade using ffmpeg xfade
    print("Cross-fading video and rendering MP4...")
    # Cut Part A (0.5s to 8.0s) and Part B (0.0s to 0.5s)
    # xfade offset = 7.5 - 0.5 = 7.0
    filter_complex = (
        f"[0:v]trim=start={partA_start}:end={loop_duration},setpts=PTS-STARTPTS,{vf_base}[vA];"
        f"[0:v]trim=start=0:end={fade_duration},setpts=PTS-STARTPTS,{vf_base}[vB];"
        f"[vA][vB]xfade=transition=fade:duration={fade_duration}:offset={partA_duration - fade_duration},format=yuv420p[vOut]"
    )

    mp4_out = "public/hero/hero.mp4"
    subprocess.run([
        'ffmpeg', '-y', '-i', input_video, '-i', looped_audio_path,
        '-filter_complex', filter_complex,
        '-map', '[vOut]', '-map', '1:a',
        '-c:v', 'libx264', '-crf', '24', '-preset', 'slow',
        '-c:a', 'aac', '-b:a', '96k',
        '-movflags', '+faststart',
        mp4_out
    ], check=True)
    print(f"Generated {mp4_out}")

    print("Rendering WebM...")
    webm_out = "public/hero/hero.webm"
    subprocess.run([
        'ffmpeg', '-y', '-i', input_video, '-i', looped_audio_path,
        '-filter_complex', filter_complex,
        '-map', '[vOut]', '-map', '1:a',
        '-c:v', 'libvpx-vp9', '-crf', '36', '-b:v', '0',
        '-c:a', 'libopus', '-b:a', '80k',
        webm_out
    ], check=True)
    print(f"Generated {webm_out}")

    # Step 4: Make portrait still (head-to-shirt crop at 480x600 saved as portrait-bust.webp)
    print("Generating portrait-bust.webp and og.jpg...")
    frame_still_path = "scripts/temp/still.png"
    subprocess.run([
        'ffmpeg', '-y', '-ss', '00:00:02', '-i', input_video,
        '-vframes', '1', frame_still_path
    ], check=True)

    still_img = Image.open(frame_still_path)
    # Head-to-shirt: X center ~ 968. Box: 480 wide, 600 high from Y=15 to 615, X=728 to 1208
    crop_bust = still_img.crop((728, 15, 1208, 615)).resize((480, 600), Image.Resampling.LANCZOS)
    # Whiten background in PIL
    bust_arr = np.array(crop_bust).astype(np.float32)
    # Whiten off-white pixels
    bust_arr = np.clip(bust_arr * (255.0 / (255.0 * 0.98)), 0, 255).astype(np.uint8)
    Image.fromarray(bust_arr).save('public/portrait-bust.webp', 'WEBP', quality=92)
    print("Generated public/portrait-bust.webp")

    # Step 5: Make og.jpg at 1200x630
    og_canvas = Image.new('RGB', (1200, 630), '#f4f2ee')
    # Put bust on right side
    og_bust = Image.fromarray(bust_arr).resize((400, 500), Image.Resampling.LANCZOS)
    og_canvas.paste(og_bust, (720, 65))
    og_canvas.save('public/og.jpg', 'JPEG', quality=90)
    print("Generated public/og.jpg")

    # Step 6: Copy resume to public/
    resume_source = 'Priyan_I_ATS_Resume_Final_Updated.pdf'
    if os.path.exists(resume_source):
        import shutil
        shutil.copy(resume_source, 'public/Priyan_I_ATS_Resume_Final_Updated.pdf')
        shutil.copy(resume_source, 'public/resume.pdf')
        print("Copied resume to public/")

    print("Hero assets pipeline successfully completed!")

if __name__ == '__main__':
    build_hero_assets()
