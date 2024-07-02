import { animate, KeyframeOptions } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
    initial: number,
    final: number,
    animateOption?: KeyframeOptions,
    isWinner: boolean
}

export const AnimatedCounter = ({ initial, final, animateOption, isWinner }: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current!;
        const divElement = divRef.current!;
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

        const dynamicClass = isWinner ? "text-green-500" : "text-red-500";
        const dynamicIcon = isWinner ? "icons8-close-green" : "icons8-close-red";
        element.className = `font-semibold text-9xl ${dynamicClass}`;
        divElement.className = `mt-4 ${dynamicIcon}`

    }, [final]);

    return (
        <div className="flex items-center justify-center">
            <span ref={ref} className="text-white font-semibold text-9xl" />
            <div ref={divRef} className="icons8-close mt-4"></div>
        </div>
    )
}