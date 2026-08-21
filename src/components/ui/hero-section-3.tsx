"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollFlyInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  imageUrl: string;
  imageAlt?: string;
}

const ScrollFlyIn = React.forwardRef<HTMLDivElement, ScrollFlyInProps>(
  ({ children, imageUrl, imageAlt = "Animated image", className, ...props }, ref) => {
    const targetRef = React.useRef<HTMLDivElement>(null);

    // Read once on mount, then recompute on resize/rotation — the scroll-speed
    // math below stays exactly as specified, this just keeps the fly-across
    // distance correct instead of freezing at the width the page happened to
    // load at.
    const [screenWidth, setScreenWidth] = React.useState(() => window.innerWidth);
    React.useEffect(() => {
      const onResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0.1, 0.8], [`-${5*screenWidth}px`, `${2.5*screenWidth}px`]);
    const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.7, 0.8], [0, 1, 1, 0]);

    return (
      <div
        ref={(node) => {
          targetRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn("relative h-[200vh]", className)}
        {...props}
      >
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <div className="z-10 text-center">
            {children}
          </div>
          <motion.div
            style={{ x, opacity }}
            className="absolute top-0 left-0 z-20 flex h-full w-full items-center"
          >
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-auto h-auto max-w-none"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/1200x800/000000/ffffff?text=Image+Error`;
              }}
            />
          </motion.div>
        </div>
      </div>
    );
  }
);

ScrollFlyIn.displayName = "ScrollFlyIn";

export { ScrollFlyIn };
