"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface SoundWaveProps {
  className?: string;
  isPlaying?: boolean;
}

const SoundWave: React.FC<SoundWaveProps> = ({ className, isPlaying }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [barCount, setBarCount] = useState(48);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const updateBarCount = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Calculate bar count based on width: each bar is 4px (w-1) + 4px gap = 8px total
        // Add some buffer for better visual
        const calculatedCount = Math.floor(containerWidth / 8);
        // Ensure minimum and maximum bounds
        const boundedCount = Math.max(12, Math.min(calculatedCount, 60));
        setBarCount(boundedCount);
      }
    };

    updateBarCount();

    // Add resize listener
    const resizeObserver = new ResizeObserver(updateBarCount);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Generate bar heights dynamically based on count
  const generateBarHeights = (count: number) => {
    const heights = [];
    for (let i = 0; i < count; i++) {
      // Generate varied heights between 20% and 95%
      const height = 20 + Math.random() * 75;
      heights.push(Math.round(height));
    }
    return heights;
  };

  const barHeights = generateBarHeights(barCount);

  return (
    <div
      ref={containerRef}
      className={clsx("flex items-center justify-between gap-1 z-0", className)}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const baseHeight = barHeights[i];
        // Reset delay every 3 items: 0, 0.08, 0.16, 0, 0.08, 0.16, ...
        const animationDelay = (i % 3) * 0.08;

        // Choose different animation types for variety
        const animationType = i % 3;
        let animationClass = "";
        if (isPlaying && isMounted) {
          switch (animationType) {
            case 0:
              animationClass = "animate-sound-wave";
              break;
            case 1:
              animationClass = "animate-sound-wave-pulse";
              break;
            case 2:
              animationClass = "animate-sound-wave-flow";
              break;
          }
        }

        // Calculate opacity based on position (deterministic)
        const opacityValue =
          isPlaying && isMounted ? 0.4 + Math.sin(i * 0.4) * 0.5 : 0.3;

        return (
          <div
            key={i}
            className={clsx(
              "w-1 rounded-full bg-white/25 shrink-0 transition-all duration-300",
              isPlaying && isMounted ? animationClass : "opacity-30"
            )}
            style={{
              height: `${baseHeight}%`,
              animationDelay: `${animationDelay}s`,
              opacity: opacityValue,
            }}
          />
        );
      })}
    </div>
  );
};

export default SoundWave;
