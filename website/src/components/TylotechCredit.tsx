"use client";

import { useEffect, useRef } from "react";

/**
 * "Designed & developed by TYLOTECH" — typed-out credit link with a
 * blinking caret. Mirrors the animation from the snippet you provided.
 */
export function TylotechCredit() {
  const elRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const normalText = "Designed & developed by ";
    const boldText = "TYLOTECH";
    const speed = 80;
    const eraseSpeed = 40;
    const delayAfterTyping = 1500;
    const delayAfterErase = 500;
    const fullText = normalText + boldText;

    let index = 0;
    let isDeleting = false;
    let timeoutId: number | null = null;

    const render = (current: string) => {
      if (current.length > normalText.length) {
        el.innerHTML =
          normalText + "<strong>" + current.slice(normalText.length) + "</strong>";
      } else {
        el.textContent = current;
      }
    };

    const tick = () => {
      if (!isDeleting && index <= fullText.length) {
        render(fullText.substring(0, index++));
        timeoutId = window.setTimeout(tick, speed);
      } else if (isDeleting && index >= 0) {
        render(fullText.substring(0, index--));
        timeoutId = window.setTimeout(tick, eraseSpeed);
      } else if (!isDeleting) {
        isDeleting = true;
        timeoutId = window.setTimeout(tick, delayAfterTyping);
      } else {
        isDeleting = false;
        timeoutId = window.setTimeout(tick, delayAfterErase);
      }
    };

    tick();

    return () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <a
      href="https://tylotech.de"
      target="_blank"
      rel="noreferrer"
      aria-label="Designed & developed by TYLOTECH"
      className="tylotech-credit inline-flex items-center"
    >
      <span ref={elRef} />
    </a>
  );
}
