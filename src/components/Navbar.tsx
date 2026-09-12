"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const navHiddenRef = useRef(false);

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Lock body scroll when mobile menu is open & handle Escape key
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Scroll show/hide behavior matching vanilla portfolio with zero re-render overhead
  useEffect(() => {
    const siteNav = navRef.current;
    if (!siteNav) return;

    let lastScrollY = window.scrollY;
    let thresholdBottom = 0;
    let ticking = false;
    const directionBuffer = 6;

    const heroKicker = document.getElementById("hero-kicker");

    const updateThreshold = () => {
      if (heroKicker instanceof HTMLElement) {
        const { top, height } = heroKicker.getBoundingClientRect();
        thresholdBottom = top + window.scrollY + height;
      } else {
        thresholdBottom = window.innerHeight * 0.5;
      }
    };

    const setNavHidden = (hidden: boolean) => {
      if (navHiddenRef.current === hidden || !navRef.current) {
        return;
      }

      navHiddenRef.current = hidden;
      navRef.current.style.opacity = hidden ? "0" : "1";
      navRef.current.style.translate = hidden
        ? "0 calc(-100% - 1.5rem)"
        : "0 0";
    };

    const syncNavOnScroll = () => {
      updateThreshold();
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= thresholdBottom) {
        setNavHidden(false);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      if (Math.abs(delta) >= directionBuffer) {
        setNavHidden(delta > 0);
        lastScrollY = currentScrollY;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(syncNavOnScroll);
      }
    };

    const handleResize = () => {
      updateThreshold();
      if (window.scrollY <= thresholdBottom) {
        setNavHidden(false);
      }
      lastScrollY = window.scrollY;
    };

    updateThreshold();
    if (window.scrollY > thresholdBottom) {
      setNavHidden(true);
    }
    lastScrollY = window.scrollY;

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header>
        <nav
          ref={navRef}
          id="site-nav"
          className="fixed top-0 inset-x-0 mx-auto z-100 w-full max-w-375 px-5 py-5 flex items-center justify-between gap-3 opacity-0 animate-[fadeDown_0.6s_0.1s_ease_forwards]"
          style={{
            transition:
              "translate 280ms cubic-bezier(.22,1,.36,1), opacity 220ms ease",
            willChange: "translate, opacity",
          }}
        >
          {/* Avatar & Name */}
          <Link
            href="/"
            className="relative flex items-center gap-3 rounded-full py-2.5 pr-5 pl-2.5 no-underline border border-black/6 bg-linear-to-b from-white/94 to-white/82 backdrop-blur-lg [backdrop-filter:saturate(1.25)_blur(16px)] shadow-[0_18px_40px_rgba(164,142,94,0.12),0_4px_12px_rgba(10,10,10,0.04),inset_0_1px_0_rgba(255,255,255,0.72)]"
          >
            <Image
              src="/shadow-dp.png"
              alt={`${siteConfig.name} (${siteConfig.nickname})`}
              width={40}
              height={40}
              priority
              className="w-10 h-10 bg-black rounded-full object-cover shrink-0"
            />
            <span className="text-base font-medium text-black tracking-tight">
              {siteConfig.shortName}
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="relative hidden md:flex rounded-full p-1.5 items-center gap-1 list-none border border-black/6 bg-linear-to-b from-white/94 to-white/82 backdrop-blur-lg [backdrop-filter:saturate(1.25)_blur(16px)] shadow-[0_18px_40px_rgba(164,142,94,0.12),0_4px_12px_rgba(10,10,10,0.04),inset_0_1px_0_rgba(255,255,255,0.72)]">
            {siteConfig.navLinks.map((link) => {
              const isBlog = link.href === "/blog" && pathname?.startsWith("/blog");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative block px-5 py-2.5 text-base font-medium no-underline rounded-full tracking-wide transition-colors duration-200 ${
                      isBlog
                        ? "text-accent"
                        : "text-gray-mid hover:text-black hover:bg-white/80"
                    }`}
                  >
                    {link.label}
                    {isBlog && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-0.75 w-3.5 rounded-full bg-accent" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <a
            href={siteConfig.resume.path}
            download={siteConfig.resume.filename}
            className="relative hidden md:flex items-center gap-2 bg-accent text-[#f6f6f6]! rounded-full px-6 py-3 text-base font-medium no-underline border border-[rgba(19,35,228,0.54)] shadow-[0_18px_34px_rgba(30,45,246,0.3),0_4px_12px_rgba(10,10,10,0.08),inset_0_1px_0_rgba(255,255,255,0.26)] transition-all duration-200 hover:opacity-88 hover:scale-97"
          >
            Resume
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M12 3v11" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
          </a>

          {/* Hamburger button (mobile only) */}
          <button
            id="menu-toggle"
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Toggle menu"}
            className="relative z-110 md:hidden w-12 h-12 rounded-full grid place-items-center cursor-pointer border border-black/6 bg-linear-to-b from-white/94 to-white/82 backdrop-blur-lg [backdrop-filter:saturate(1.25)_blur(16px)] shadow-[0_18px_40px_rgba(164,142,94,0.12),0_4px_12px_rgba(10,10,10,0.04),inset_0_1px_0_rgba(255,255,255,0.72)]"
          >
            {menuOpen ? (
              <svg
                id="menu-icon-close"
                className="w-6 h-6 text-black pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <line x1={6} y1={6} x2={18} y2={18} />
                <line x1={6} y1={18} x2={18} y2={6} />
              </svg>
            ) : (
              <svg
                id="menu-icon-open"
                className="w-6 h-6 text-black pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <line x1={4} y1={7} x2={20} y2={7} />
                <line x1={4} y1={12} x2={20} y2={12} />
                <line x1={4} y1={17} x2={20} y2={17} />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-90 bg-bg/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {siteConfig.navLinks.map((link) => {
          const isBlog = link.href === "/blog" && pathname?.startsWith("/blog");
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`text-2xl font-medium no-underline py-3 px-6 rounded-2xl transition-colors duration-200 mobile-link ${
                isBlog ? "text-accent font-semibold" : "text-gray-dark hover:bg-surface-alt"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <a
          href={siteConfig.resume.path}
          download={siteConfig.resume.filename}
          onClick={closeMenu}
          className="mobile-link mt-4 flex items-center gap-2 bg-accent text-[#f6f6f6]! rounded-full px-8 py-3 text-base font-medium no-underline transition-all duration-200 hover:opacity-88 hover:scale-97"
        >
          Resume
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path d="M12 3v11" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
        </a>
      </div>
    </>
  );
}
