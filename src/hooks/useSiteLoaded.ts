import { useState, useEffect } from 'react';

export const useSiteLoaded = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const checkLoaded = () => {
            // If the global flag is false, or the class is present, we are loaded.
            // Also, if the flag is undefined (LoadingScreen not even mounted), we assume loaded after a check.
            if ((window as any).isSiteLoading === false || document.body.classList.contains('loading-done')) {
                setIsLoaded(true);
                return true;
            }
            return false;
        };

        if (checkLoaded()) return;

        const handleLoaded = () => {
            setIsLoaded(true);
        };

        window.addEventListener('siteLoaded', handleLoaded);
        
        // Polling fallback + auto-load if LoadingScreen is missing
        let attempts = 0;
        const interval = setInterval(() => {
            attempts++;
            if (checkLoaded()) {
                clearInterval(interval);
            } else if (attempts > 30 && (window as any).isSiteLoading === undefined) {
                // If after 3 seconds LoadingScreen hasn't even set the flag to true, 
                // it's likely not there.
                setIsLoaded(true);
                clearInterval(interval);
            }
        }, 100);

        return () => {
            window.removeEventListener('siteLoaded', handleLoaded);
            clearInterval(interval);
        };
    }, []);

    return isLoaded;
};
