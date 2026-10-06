// Smooth scroll del sitio: UNA instancia de Lenis por página, creada desde el Layout.
// Antes cada página creaba la suya (y alguna, dos). Las islas que necesiten pausar el scroll
// (p. ej. el menú) usan getLenis().
import type Lenis from "lenis";

let instance: Promise<Lenis | null> | null = null;

export function initSmoothScroll(): Promise<Lenis | null> {
  instance ??= (async () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

    const [{ default: LenisCtor }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]);
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new LenisCtor({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Un solo reloj para todo: Lenis avanza con el ticker de GSAP y avisa a ScrollTrigger.
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return lenis;
  })();
  return instance;
}

export function getLenis(): Promise<Lenis | null> {
  return instance ?? Promise.resolve(null);
}
