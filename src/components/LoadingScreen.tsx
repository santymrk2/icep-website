import React, { useState, useEffect, useRef } from "react";

const LoadingScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const spinnerRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Set global loading state immediately on mount
        (window as any).isSiteLoading = true;
        document.body.classList.add("is-loading");

        let dismissed = false;
        let fallbackTimeout: any;
        let gsapInstance: any = null;

        const finish = () => {
            setIsLoading(false);
            (window as any).isSiteLoading = false;
            document.body.classList.remove("is-loading");
            document.body.classList.add("loading-done");
            window.dispatchEvent(new CustomEvent("siteLoaded"));
        };

        const dismiss = () => {
            if (dismissed) return;
            dismissed = true;
            clearTimeout(fallbackTimeout);

            // Sin GSAP (falló la descarga) igual hay que liberar la página.
            if (!gsapInstance) return finish();

            // Small delay to ensure smooth transition
            setTimeout(() => {
                const tl = gsapInstance.timeline({ onComplete: finish });
                tl.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.inOut"
                });
            }, 500);
        };

        // Solo lo que se ve al entrar: el hero de la home. El resto carga lazy al scrollear.
        // Antes se precargaban 12 fotos de la home en TODAS las páginas.
        const imagesToPreload = window.location.pathname === "/" ? ["/assets/General.webp"] : [];

        // Fallback: dismiss after 5s even if images or GSAP are slow/broken
        fallbackTimeout = setTimeout(dismiss, 5000);

        const run = async () => {
            try {
                const { default: gsap } = await import("gsap");
                gsapInstance = gsap;
            } catch {
                return dismiss();
            }
            const gsap = gsapInstance;

            // Inner animations
            gsap.to(spinnerRef.current, {
                rotate: 360,
                duration: 1,
                repeat: -1,
                ease: "none"
            });

            gsap.to(dotRef.current, {
                opacity: 0.4,
                duration: 0.75,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });

            gsap.fromTo(textRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
            );

            // Preload all images in parallel
            let loaded = 0;
            const total = imagesToPreload.length;
            if (total === 0) return dismiss();

            const onImageReady = () => {
                loaded++;
                if (loaded >= total) dismiss();
            };

            imagesToPreload.forEach((src) => {
                const img = new Image();
                img.onload = onImageReady;
                img.onerror = onImageReady; // count errors too so we don't block forever
                img.src = src;
            });
        };
        run();

        return () => {
            clearTimeout(fallbackTimeout);
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-950 transition-colors duration-300"
        >
            <div className="relative">
                {/* Main Spinner */}
                <div
                    ref={spinnerRef}
                    className="w-16 h-16 rounded-full border-4 border-neutral-800 border-t-primary"
                />

                {/* Inner Glow/Dot */}
                <div
                    ref={dotRef}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
            </div>

            <p
                ref={textRef}
                className="mt-6 text-sm font-medium tracking-widest text-neutral-500 uppercase"
            >
                Cargando
            </p>
        </div>
    );
};

export default LoadingScreen;
