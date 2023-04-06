import { useEffect, useMemo, useState } from 'react';

function usePlayingOnScreen(options, targetRef) {
    const [isVisible, setIsVisible] = useState(false);

    const callbackFunc = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isInteractive);
    };

    const optionMemo = useMemo(() => {
        return options;
    }, [options]);

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunc, optionMemo);
        const currentTarget = targetRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }
        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    });
    return isVisible;
}

export default usePlayingOnScreen;
