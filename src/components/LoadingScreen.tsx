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

        const dismiss = () => {
            if (dismissed || !gsapInstance) return;
            dismissed = true;
            clearTimeout(fallbackTimeout);

            // Small delay to ensure smooth transition
            setTimeout(() => {
                const tl = gsapInstance.timeline({
                    onComplete: () => {
                        setIsLoading(false);
                        (window as any).isSiteLoading = false;
                        document.body.classList.remove("is-loading");
                        document.body.classList.add("loading-done");
                        window.dispatchEvent(new CustomEvent("siteLoaded"));
                    }
                });
                tl.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.inOut"
                });
            }, 500);
        };

        // Images to preload — hero + home sections + all Services activity cards
        const imagesToPreload = [
            "/assets/General.webp",
            "/assets/PG08.webp",
            "/assets/PG09.webp",
            "/assets/PG03.webp",
            "/assets/Cena.jpg",
            "/assets/Ensenianza.webp",
            "/assets/Escuelita.jpg",
            "/assets/adoloscentes.jpg",
            "/assets/Jovenes.webp",
            "/assets/Mujeres.webp",
            "/assets/Matrimonio.jpg",
            "/assets/Oracion.webp",
        ];

        const run = async () => {
            const { default: gsap } = await import("gsap");
            gsapInstance = gsap;

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

            // Fallback: dismiss after 5s even if images are slow/broken
            fallbackTimeout = setTimeout(dismiss, 5000);
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
