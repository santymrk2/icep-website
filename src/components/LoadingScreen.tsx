import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            // Small delay to ensure smooth transition
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        };

        // Check if everything is already loaded
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        // Fallback in case load event doesn't fire as expected
        const fallbackTimeout = setTimeout(handleLoad, 5000);

        return () => {
            window.removeEventListener("load", handleLoad);
            clearTimeout(fallbackTimeout);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-neutral-950 transition-colors duration-300"
                >
                    <div className="relative">
                        {/* Main Spinner */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 rounded-full border-4 border-neutral-200 dark:border-neutral-800 border-t-primary"
                        />

                        {/* Inner Glow/Dot */}
                        <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary" />
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-sm font-medium tracking-widest text-neutral-400 dark:text-neutral-500 uppercase"
                    >
                        Cargando
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
