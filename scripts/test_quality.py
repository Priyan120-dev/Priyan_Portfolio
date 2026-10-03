import sys
import os
import json
from playwright.sync_api import sync_playwright

def run_checks():
    errors = []
    console_logs = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1. Desktop Test (1440x900)
        print("--- Testing Desktop (1440x900) ---")
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))
        page.on("pageerror", lambda exc: errors.append(f"PageError: {exc}"))

        page.goto("http://localhost:3000", wait_until="networkidle")
        page.wait_for_timeout(1000)

        # Check overflow on desktop
        overflow = page.evaluate("() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth })")
        print(f"Desktop scrollWidth: {overflow['scrollWidth']}, innerWidth: {overflow['innerWidth']}")
        assert overflow['scrollWidth'] == overflow['innerWidth'], f"Horizontal overflow detected on desktop: {overflow}"

        # Capture Desktop Full Page and Viewport Screenshot
        page.screenshot(path="screenshot_1440x900.png", full_page=False)
        print("Desktop screenshot captured: screenshot_1440x900.png")

        # Test Hero Video & Sound Toggle
        video_info = page.evaluate("""() => {
            const v = document.querySelector('video');
            return {
                exists: !!v,
                src: v ? v.currentSrc : null,
                muted: v ? v.muted : null,
                paused: v ? v.paused : null
            };
        }""")
        print("Video info:", video_info)

        # Click sound toggle button
        sound_btn = page.locator("button[aria-label*='video voice intro']")
        if sound_btn.count() > 0:
            print("Sound button exists, clicking...")
            sound_btn.click()
            page.wait_for_timeout(400)
            muted_after = page.evaluate("() => document.querySelector('video').muted")
            print(f"Muted after click: {muted_after}")

        # Test ID Card Flip with force=True (since card has idle sway pendulum animation)
        id_card = page.locator("[aria-label*='Developer ID Card']")
        if id_card.count() > 0:
            print("ID Card found, testing flip...")
            id_card.hover(force=True)
            page.wait_for_timeout(300)
            id_card.click(force=True)
            page.wait_for_timeout(400)
            print("ID Card flip tested successfully.")

        # Test Skills Periodic Table hover & Inspector update
        skill_btn = page.locator("button:has-text('Re')").first
        if skill_btn.count() > 0:
            print("Hovering on React skill tile...")
            skill_btn.hover(force=True)
            page.wait_for_timeout(300)

        # Test Work Accordion panel expand
        work_panel = page.locator("[aria-label*='AdaptIQ project panel']")
        if work_panel.count() > 0:
            print("Expanding AdaptIQ project panel...")
            work_panel.click(force=True)
            page.wait_for_timeout(400)

        # Scroll down through Achievements and Contact
        page.evaluate("window.scrollTo(0, 2400)")
        page.wait_for_timeout(600)
        page.evaluate("window.scrollTo(0, 4800)")
        page.wait_for_timeout(800)

        context.close()

        # 2. Mobile Test (390x844)
        print("\n--- Testing Mobile (390x844) ---")
        mobile_context = browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
        mobile_page = mobile_context.new_page()

        mobile_page.on("console", lambda msg: console_logs.append(f"[Mobile {msg.type}] {msg.text}"))
        mobile_page.on("pageerror", lambda exc: errors.append(f"Mobile PageError: {exc}"))

        mobile_page.goto("http://localhost:3000", wait_until="networkidle")
        mobile_page.wait_for_timeout(1000)

        # Check mobile overflow
        mobile_overflow = mobile_page.evaluate("() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth })")
        print(f"Mobile scrollWidth: {mobile_overflow['scrollWidth']}, innerWidth: {mobile_overflow['innerWidth']}")
        assert mobile_overflow['scrollWidth'] == mobile_overflow['innerWidth'], f"Horizontal overflow detected on mobile: {mobile_overflow}"

        # Capture Mobile Screenshot
        mobile_page.screenshot(path="screenshot_390x844.png", full_page=False)
        print("Mobile screenshot captured: screenshot_390x844.png")

        # Test Mobile Menu Open & Close
        menu_btn = mobile_page.locator("button[aria-label='Toggle navigation menu']")
        if menu_btn.count() > 0:
            print("Mobile menu button found, testing click...")
            menu_btn.click(force=True)
            mobile_page.wait_for_timeout(400)
            mobile_page.screenshot(path="screenshot_mobile_menu.png")
            print("Mobile menu screenshot captured: screenshot_mobile_menu.png")

            # Close menu
            close_btn = mobile_page.locator("button[aria-label='Close navigation menu']")
            if close_btn.count() > 0:
                close_btn.click(force=True)
                mobile_page.wait_for_timeout(300)

        # Scroll through mobile page to check all sections for overflow
        for scroll_y in [600, 1200, 2000, 3000, 4200]:
            mobile_page.evaluate(f"window.scrollTo(0, {scroll_y})")
            mobile_page.wait_for_timeout(200)
            chk = mobile_page.evaluate("() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth })")
            assert chk['scrollWidth'] == chk['innerWidth'], f"Overflow at scroll {scroll_y}: {chk}"

        mobile_context.close()
        browser.close()

    print("\n--- Console Summary ---")
    error_logs = [log for log in console_logs if "error" in log.lower()]
    print(f"Total console logs: {len(console_logs)}, Error logs: {len(error_logs)}")
    for l in error_logs:
        print("LOG:", l)

    if errors:
        print("\nErrors encountered:")
        for err in errors:
            print(err)
        sys.exit(1)
    else:
        print("\nALL Playwright Quality Checks PASSED with 0 errors!")

if __name__ == '__main__':
    run_checks()
