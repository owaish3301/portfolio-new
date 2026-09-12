"use client";

import { useEffect } from "react";

const revealVisibleClasses = ["opacity-100", "translate-y-0", "scale-100"];
const revealHiddenClasses = ["opacity-0", "translate-y-6", "scale-[0.98]"];

export default function ScrollReveal() {
  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    const revealElement = (element: HTMLElement) => {
      element.classList.remove(...revealHiddenClasses);
      element.classList.add(...revealVisibleClasses);
    };

    if (revealElements.length === 0) {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach(revealElement);
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            revealElement(entry.target);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    return () => revealObserver.disconnect();
  }, []);

  return null;
}
