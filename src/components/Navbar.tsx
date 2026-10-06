import { useState, useEffect, useRef, useCallback } from "react";
import Paths from "../data/paths.json";
import { socialLinks } from "../data/footer";
import { getLenis } from "../lib/smooth-scroll";

interface MenuItem {
  text: string;
  href: string;
  active: boolean;
  main?: boolean;
}

const menuItems = Paths as MenuItem[];

// Si GSAP todavía no cargó cuando tocan el menú, lo esperamos en vez de ignorar el click.
let gsapPromise: Promise<any> | null = null;
const loadGsap = () => (gsapPromise ??= import("gsap").then((m) => m.default));

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [year, setYear] = useState(() => new Date().getFullYear());

  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLUListElement>(null);
  const drawerBottomRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<any>(null);

  useEffect(() => {
    loadGsap();
    setYear(new Date().getFullYear());
  }, []);

  const openMenu = useCallback(async () => {
    const gsap = await loadGsap();
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    const links = menuLinksRef.current;
    const bottom = drawerBottomRef.current;
    if (!drawer || !backdrop) return;

    timelineRef.current?.kill();

    document.body.style.overflow = "hidden";
    getLenis().then((lenis) => lenis?.stop());

    gsap.set(drawer, { display: "flex" });
    gsap.set(backdrop, { display: "block" });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    const pageContent = document.querySelector("main");

    tl.to(backdrop, { opacity: 1, duration: 0.4 }).fromTo(
      drawer,
      { x: "100%" },
      { x: "0%", duration: 0.6, ease: "power3.out" },
      0,
    );

    if (pageContent) {
      tl.to(pageContent, { x: -80, duration: 0.6, ease: "power3.out" }, 0);
    }

    if (links) {
      tl.from(
        links.querySelectorAll("li"),
        { x: 40, opacity: 0, duration: 0.4, stagger: 0.06, ease: "power3.out" },
        0.2,
      );
    }

    if (bottom) {
      tl.from(bottom, { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" }, 0.4);
    }

    timelineRef.current = tl;
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(async () => {
    const gsap = await loadGsap();
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    if (!drawer || !backdrop) return;

    timelineRef.current?.kill();

    const pageContent = document.querySelector("main");
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        gsap.set(drawer, { display: "none" });
        gsap.set(backdrop, { display: "none" });
        // Un transform residual en <main> (aunque sea 0) rompe los position:fixed de adentro,
        // como el pin de "Nuestras Actividades".
        if (pageContent) gsap.set(pageContent, { clearProps: "transform" });
        document.body.style.overflow = "";
        getLenis().then((lenis) => lenis?.start());
      },
    });

    tl.to(drawer, { x: "100%", duration: 0.5 }).to(backdrop, { opacity: 0, duration: 0.35 }, 0);

    if (pageContent) {
      tl.to(pageContent, { x: 0, duration: 0.5 }, 0);
    }

    timelineRef.current = tl;
    setIsMenuOpen(false);
  }, []);

  // Escape cierra el menú
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen, closeMenu]);

  return (
    <header
      className="text-white m-0 sm:m-0 rounded-none z-50 h-20 transition-all duration-300 w-full md:pt-8 md:px-20 absolute top-0"
      id="back-menu"
    >
      <div className="w-full max-w-full flex flex-row items-center justify-between h-20 gap-4 px-6 m-0 overflow-hidden scrollbar-hide relative">
        <div className="flex items-center h-full">
          <a href="/" id="site-logo" className="flex items-center h-full" aria-label="Inicio">
            <img className="size-12 lg:size-16" src="/ICEPLogo.png" alt="ICEP" width={64} height={64} />
          </a>
        </div>
        {/* Botón menú: siempre visible */}
        <div className="flex items-center h-full relative z-[60]">
          <button
            id="mobile-menu-button"
            className="rounded-full group transition-all ease-in-out inline-flex w-9 h-9 text-white text-center items-center justify-center p-2 hover:bg-neutral-700/50"
            aria-pressed={isMenuOpen}
            aria-expanded={isMenuOpen}
            aria-controls="site-drawer"
            onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
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
        id="site-drawer"
        className="fixed top-0 right-0 h-full z-[58] w-full md:w-96"
        style={{ display: "none", transform: "translateX(100%)" }}
      >
        <div className="bg-neutral-900 flex flex-col items-start justify-start px-12 pb-8 pt-0 md:pt-8 w-full h-full shadow-2xl overflow-y-auto scrollbar-hide">
          <ul ref={menuLinksRef} className="list-none space-y-6 w-full mt-24">
            {menuItems
              .filter((item) => item.active)
              .map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className="text-neutral-400 hover:text-white text-3xl font-bold no-underline transition-colors duration-300 block"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
          </ul>

          <div ref={drawerBottomRef} className="mt-auto w-full">
            <hr className="w-full border-t border-neutral-800 mb-6" />

            <p className="mb-6 leading-relaxed text-gray-500 text-sm" suppressHydrationWarning>
              © {year} Iglesia Complejo Evangélico Pilar.<br />Todos los derechos reservados.
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
    </header>
  );
};

export default Navbar;
