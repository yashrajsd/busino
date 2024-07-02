import { animate, KeyframeOptions, useIsomorphicLayoutEffect } from "framer-motion";
import { useRef } from "react";

interface AnimatedCounterProps {
    initial: number,
    final: number,
    animateOption?: KeyframeOptions;
}

export const AnimatedCounter = ({ initial, final, animateOption }: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);

    useIsomorphicLayoutEffect(() => {
        const element = ref.current!;
        if (!element) console.log("no element if referenced");

        element.textContent = String(initial);

        const controls = animate(initial, final, {
            duration: 0.5,
            ease: "easeOut",
            ...animateOption,
            onUpdate(value) {
                element.textContent = value.toFixed(2);
            }
        })

    }, []);

    return (
        <div className="flex items-center justify-center">
            <span ref={ref} className="text-white font-semibold text-9xl" />
            <div className="icons8-close mt-4"></div>
        </div>
    )
}