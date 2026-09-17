"use client";

import { useEffect, useState } from "react";

export default function MouseCursorDot() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const target = event.target;
      setIsHoveringInteractive(
        target instanceof Element &&
          Boolean(
            target.closest(
              'a, button, input, textarea, select, [role="button"], [data-cursor-hover]',
            ),
          ),
      );
    };

    const handlePointerLeave = () => setVisible(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerover", handlePointerOver);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none fixed z-[10000] rounded-full"
      style={{
        left: position.x,
        top: position.y,
        width: isHoveringInteractive ? 36 : 12,
        height: isHoveringInteractive ? 36 : 12,
        transform: "translate(-50%, -50%)",
        backgroundColor: isHoveringInteractive
          ? "#ffffff"
          : "#000000",
        mixBlendMode: isHoveringInteractive ? "difference" : "normal",
        opacity: visible ? 1 : 0,
        transition:
          "width 180ms ease-out, height 180ms ease-out, background-color 180ms ease-out, opacity 180ms ease-out",
      }}
    />
  );
}
