import { useState, useEffect, useRef, useCallback } from "react";
import Transition from "../components/Transition";
import Paths from "../data/paths.json";
import { socialLinks } from "../data/footer";

const Navbar = () => {
  interface SubItem {
    text: string;
    href: string;
    active: boolean;
  }

  interface MenuItem {
    text: string;
    href: string;
    icon?: string;
    active: boolean;
    subitems?: SubItem[] | null; // Permitir null en subitems
    main?: boolean;
  }

  type Paths = MenuItem[];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: Paths = Paths as MenuItem[];
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const firstRender = useRef(true);

  // GSAP refs
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLUListElement>(null);
  const drawerBottomRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<any>(null);
  const gsapRef = useRef<any>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { default: gsap } = await import("gsap");
      gsapRef.current = gsap;
    };
    loadGSAP();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }

    const handlePathChange = () => {
      if (typeof window !== "undefined") {
        setCurrentPath(window.location.pathname);
      }
    };

    window.addEventListener("astro:after-swap", handlePathChange);
    window.addEventListener("popstate", handlePathChange);

    return () => {
      window.removeEventListener("astro:after-swap", handlePathChange);
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  // Evitar animación en el primer render
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

  // ── GSAP drawer animation ────────────────────────────────────────
  const openMenu = useCallback(() => {
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    const links = menuLinksRef.current;
    const bottom = drawerBottomRef.current;
    const gsap = gsapRef.current;
    if (!drawer || !backdrop || !gsap) return;

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    document.body.style.overflow = "hidden";

    // Make elements visible before animating
    gsap.set(drawer, { display: "flex" });
    gsap.set(backdrop, { display: "block" });

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
    });

    // Page content shifts left + drawer slides in from right
    const pageContent = document.querySelector("main") || document.querySelector("#main-content");
    
    tl.to(backdrop, {
      opacity: 1,
      duration: 0.4,
    })
    .fromTo(
      drawer,
      { x: "100%" },
      { x: "0%", duration: 0.6, ease: "power3.out" },
      0
    );

    // Shift the page content to the left
    if (pageContent) {
      tl.to(
        pageContent,
        { x: -80, duration: 0.6, ease: "power3.out" },
        0
      );
    }

    // Stagger menu links
    if (links) {
      const items = links.querySelectorAll("li");
      tl.from(
        items,
        {
          x: 40,
          opacity: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power3.out",
        },
        0.2
      );
    }

    // Bottom section fade in
    if (bottom) {
      tl.from(
        bottom,
        { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" },
        0.4
      );
    }

    timelineRef.current = tl;
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    const gsap = gsapRef.current;
    if (!drawer || !backdrop || !gsap) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        gsap.set(drawer, { display: "none" });
        gsap.set(backdrop, { display: "none" });
        document.body.style.overflow = "auto";
      },
    });

    const pageContent = document.querySelector("main") || document.querySelector("#main-content");

    tl.to(drawer, {
      x: "100%",
      duration: 0.5,
      ease: "power3.inOut",
    })
    .to(backdrop, { opacity: 0, duration: 0.35 }, 0);

    // Bring page content back
    if (pageContent) {
      tl.to(
        pageContent,
        { x: 0, duration: 0.5, ease: "power3.inOut" },
        0
      );
    }

    timelineRef.current = tl;
    setIsMenuOpen(false);
  }, []);

  const handleMobileMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const buttonclassNamees = `
    text-white
    no-underline
    rounded-full
    py-2
    px-4
    items-center
    text-center
    font-normal
    relative
    z-10
    transition-all
    duration-300
    tracking-wide
    font-sans
    hover:underline
    hover:opacity-80
  `;

  const buttonSelectclassNamees = `
    text-white
    no-underline
    rounded-full
    py-2
    px-4
    items-center
    text-center
    font-normal
    relative
    z-10
    transition-all
    duration-300
    tracking-wide
    font-sans
    underline
    `;

  return (
    <header
      className={`text-white m-0 sm:m-0 rounded-none z-50 h-20 transition-all duration-300 w-full md:pt-8 md:px-20 absolute top-0`}
      id="back-menu"
    >
      <div className="w-full max-w-full flex flex-row items-center justify-between h-20 gap-4 px-6 m-0 overflow-hidden scrollbar-hide relative">
        {/* Logo: esquina izq en mobile, centrado en desktop */}
        <div className="flex items-center h-full">
          <a href="/" id="site-logo" className="flex items-center h-full">
            <img className="size-12 lg:size-16" src="/ICEPLogo.png" />
          </a>
        </div>
        {/* Menú de escritorio oculto permanentemente por solicitud del usuario */}
        <nav className="hidden flex-1 justify-end items-center h-full w-full">
          <ul className="flex space-x-8 px-2 h-20 items-center justify-end w-full">
            {menuItems
              .filter((item) => item.active && item.main)
              .map((item) => (
                <li
                  key={item.text}
                  className="relative select-none flex flex-col items-center justify-center h-full"
                >
                  {!item.subitems ? (
                    <a
                      href={item.href}
                      className={`${currentPath === item.href ? "nav-active" : "nav-link"} nav-link-dot-container`}
                    >
                      <span className="relative block">
                        <span className="z-10 relative">{item.text}</span>
                        {/* Puntito para la página actual */}
                        <span
                          className={`nav-dot ${currentPath === item.href ? "opacity-100 animate-fade-in" : "opacity-0"}`}
                        ></span>
                      </span>
                    </a>
                  ) : (
                    <div className="relative group">
                      <button
                        className="nav-link inline-flex"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(
                            openDropdown === item.text ? null : item.text,
                          );
                        }}
                      >
                        <span>{item.text}</span>
                        <svg
                          className="size-5 transform transition-transform duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <Transition
                        show={item.active && openDropdown === item.text}
                        duration={200}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <div className="absolute top-full left-0 mt-2 w-full bg-neutral-800 rounded-lg shadow-lg z-20">
                          <div className="flex flex-col items-center space-y-2 bg-neutral-800">
                            {item.subitems.map((subitem) => (
                              <a
                                key={subitem.text}
                                href={subitem.href}
                                className={` ${subitem.active ? "" : "opacity-30 pointer-events-none cursor-not-allowed"} nav-link block w-full`}
                              >
                                {subitem.text}
                              </a>
                            ))}
                          </div>
                        </div>
                      </Transition>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </nav>
        {/* Botón menú móvil: siempre visible */}
        <div className="flex items-center h-full relative z-[60]">
          <button
            id="mobile-menu-button"
            className="rounded-full group transition-all ease-in-out inline-flex w-9 h-9 text-white text-center items-center justify-center p-2 hover:bg-neutral-700/50"
            aria-pressed={isMenuOpen}
            onClick={handleMobileMenu}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="size-5 fill-white pointer-events-none"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                className="origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-x-0 group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[315deg]"
                y="7"
                width="9"
                height="2"
                rx="1"
              />
              <rect
                className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-[[aria-pressed=true]]:rotate-45"
                y="7"
                width="16"
                height="2"
                rx="1"
              />
              <rect
                className="origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:-rotate-[225deg]"
                y="7"
                width="9"
                height="2"
                rx="1"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Backdrop (Fondo oscuro) — controlled by GSAP */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/60 z-[55] backdrop-blur-sm"
        style={{ display: "none", opacity: 0 }}
        onClick={closeMenu}
      />

      {/* Menú Drawer Lateral — controlled by GSAP */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full z-[58] w-full md:w-96"
        style={{ display: "none", transform: "translateX(100%)" }}
      >
        <div
          className="bg-neutral-900 flex flex-col items-start justify-start px-12 pb-8 pt-0 md:pt-8 w-full h-full shadow-2xl overflow-y-auto scrollbar-hide"
        >

          <ul ref={menuLinksRef} className="list-none space-y-6 w-full mt-24">
            {menuItems
              .filter((item) => item.active)
              .map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className={`text-neutral-400 hover:text-white text-3xl font-bold no-underline transition-colors duration-300 block`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
          </ul>

          <div ref={drawerBottomRef} className="mt-auto w-full">
            {/* Separator Line */}
            <hr className="w-full border-t border-neutral-800 mb-6" />

            <p className="mb-6 leading-relaxed text-gray-500 text-sm">
              © 2025 Iglesia Complejo Evangélico Pilar.<br />Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="size-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={social.iconPath} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Estilos para animación de subrayado y puntito */}
    </header >
  );
};

export default Navbar;
