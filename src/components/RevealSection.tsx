import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

interface RevealSectionProps {
  tilt?: number;
  reduceMotion: boolean | null;
  children: ReactNode;
  id?: string;
}

export default function RevealSection({
  tilt = 0,
  reduceMotion,
  children
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (reduceMotion) {
    return <div>{children}</div>;
  }

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* 3D Holographic In-View Spatial Unfold */}
      <motion.div
        initial={{
          opacity: 0,
          y: 60,
          scale: 0.94,
          rotateX: tilt,
          filter: "blur(14px)"
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                filter: "blur(0px)"
              }
            : {
                opacity: 0,
                y: 60,
                scale: 0.94,
                rotateX: tilt,
                filter: "blur(14px)"
              }
        }
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ perspective: "1200px" }}
        className="relative z-10"
      >
        {/* Laser Scanner Wave that sweeps vertically across on inView */}
        {isInView && (
          <motion.div
            initial={{ top: "-5%", opacity: 0 }}
            animate={{ top: "105%", opacity: [0, 0.8, 0.8, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent shadow-[0_0_15px_#3b82f6] pointer-events-none z-30"
          />
        )}

        {children}
      </motion.div>
    </div>
  );
}
