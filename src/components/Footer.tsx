import React, { useEffect, useRef } from "react";
import {
  socialLinks,
  footerSections,
  type SocialLink,
  type FooterSection,
  type FooterLink,
} from "../data/footer";

// ── Reusable sub-components ─────────────────────────────────────────────────

/** Single social icon rendered as an <a> with an inline SVG */
const SocialIcon: React.FC<SocialLink> = ({ name, href, iconPath }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={name}
    className="social-icon text-neutral-400 hover:text-white transition-colors duration-200"
  >
    <svg
      className="size-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={iconPath} />
    </svg>
  </a>
);

/** Single footer link — disabled links show a "Próximamente" tooltip */
const FooterLinkItem: React.FC<FooterLink> = ({
  text,
  href,
  disabled,
  external,
}) => {
  if (disabled) {
    return (
      <span
        className="group/tip relative text-sm text-neutral-600 cursor-default select-none inline-block"
        title="Próximamente"
      >
        {text}
        {/* Tooltip */}
        <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-700 px-2.5 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover/tip:opacity-100 z-10">
          Próximamente
        </span>
      </span>
    );
  }

  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
    >
      {text}
    </a>
  );
};

/** A column of links under a title */
const FooterColumn: React.FC<FooterSection> = ({ title, links }) => {
  const visibleLinks = links.filter((l) => l.visible);
  if (visibleLinks.length === 0) return null;

  return (
    <div className="footer-column">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
        {title}
      </h3>
      <ul className="space-y-3">
        {visibleLinks.map((link) => (
          <li key={link.href} className="footer-link-item">
            <FooterLinkItem {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// ── Main Footer ─────────────────────────────────────────────────────────────

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let ctx: any;
    
    const run = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      
      const footer = footerRef.current;
      if (!footer) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // ── Brand section fade-in from left ──────────────────────────
        if (brandRef.current) {
          gsap.from(brandRef.current, {
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: brandRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }

        // ── Columns stagger fade-in ──────────────────────────────────
        const columns = footer.querySelectorAll(".footer-column");
        if (columns.length) {
          gsap.from(columns, {
            y: 25,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: columnsRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }

        // ── Link items stagger within each column ────────────────────
        const linkItems = footer.querySelectorAll(".footer-link-item");
        if (linkItems.length) {
          gsap.from(linkItems, {
            y: 10,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: columnsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }

        // ── Bottom bar — fade up with divider ────────────────────────
        if (bottomBarRef.current) {
          gsap.from(bottomBarRef.current, {
            y: 15,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomBarRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          });
        }

        // ── Social icons stagger ─────────────────────────────────────
        const socialIcons = footer.querySelectorAll(".social-icon");
        if (socialIcons.length) {
          gsap.from(socialIcons, {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: bottomBarRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          });
        }

        // ── Big ICEPILAR text — slide up with parallax ───────────────
        if (bigTextRef.current) {
          gsap.from(bigTextRef.current, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bigTextRef.current,
              start: "top 100%",
              toggleActions: "play none none none",
            },
          });
        }
      }, footer);
    };
    run();

    return () => ctx && ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-neutral-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14">
        {/* ── Top section: brand left + link columns right ──────────── */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Brand — left side */}
          <div ref={brandRef} className="shrink-0">
            <a href="/" className="inline-block mb-4">
              <img className="size-16" src="/ICEPLogo.png" alt="ICEP Logo" />
            </a>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Iglesia Cristiana
              <br />
              Evangélica en Pilar
            </p>
          </div>

          {/* Link columns — right side */}
          <div ref={columnsRef} className="grid grid-cols-2 gap-10 sm:gap-16">
            {footerSections.map((section) => (
              <FooterColumn key={section.title} {...section} />
            ))}
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div
          ref={bottomBarRef}
          className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-neutral-500">
            © {currentYear} Iglesia Complejo Evangélico Pilar. Todos los
            derechos reservados.
          </p>

          {/* Social icons row */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <SocialIcon key={social.name} {...social} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Big brand text — scales with viewport width ───────────── */}
      <div className="w-full overflow-hidden px-2">
        <p
          ref={bigTextRef}
          className="text-center font-bold leading-none select-none whitespace-nowrap"
          style={{ fontSize: "clamp(3rem, 18vw, 21rem)" }}
        >
          ICEPILAR
        </p>
      </div>
    </footer>
  );
};

export default Footer;
