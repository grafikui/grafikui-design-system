"use client";

import tokens from "../../system-dist/json/tokens.json";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

// Map token key to its actual cubic-bezier array for live preview
const EASING_MAP: Record<string, string | number[]> = {
  linear: "linear",
  "ease-in": [0.4, 0, 1, 1],
  "ease-out": [0, 0, 0.2, 1],
  "ease-in-out": [0.4, 0, 0.2, 1],
  spring: [0.34, 1.56, 0.64, 1],
  snappy: [0.2, 0, 0, 1],
};

function DurationRow({ name, value }: { name: string; value: string }) {
  const ms = parseInt(value, 10) || 0;
  const controls = useAnimation();
  const [active, setActive] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  async function handleHover() {
    if (active) return;
    setActive(true);
    const trackWidth = trackRef.current?.offsetWidth ?? 200;
    const ballSize = 16;
    const padding = 12; // left-3 = 12px
    const target = trackWidth - ballSize - padding * 2;
    await controls.start({
      x: target,
      transition: { duration: Math.max(ms / 1000, 0.05), ease: "easeInOut" },
    });
    await controls.start({ x: 0, transition: { duration: 0.15, ease: "easeIn" } });
    setActive(false);
  }

  return (
    <motion.div
      onHoverStart={handleHover}
      className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/25 p-6 md:p-8 rounded-2xl cursor-default transition-colors group"
    >
      <code className="md:w-48 font-mono text-xs text-[var(--gfk-color-brand-default)] shrink-0">
        motion.duration.{name}
      </code>
      <span className="md:w-20 font-mono text-[11px] text-white/70 bg-white/[0.06] border border-white/10 px-3 py-1.5 rounded-lg shrink-0 text-center">
        {value}
      </span>
      <div ref={trackRef} className="flex-1 relative h-10 bg-white/[0.04] rounded-xl border border-white/5 overflow-hidden">
        <motion.div
          animate={controls}
          initial={{ x: 0 }}
          className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--gfk-color-brand-default)] shadow-[0_0_10px_var(--gfk-color-brand-default)]"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] text-white/20 uppercase tracking-widest pointer-events-none group-hover:text-white/40 transition-colors">
          hover
        </span>
      </div>
    </motion.div>
  );
}



function EasingCard({ name, value }: { name: string; value: string }) {
  const [playing, setPlaying] = useState(false);
  const controls = useAnimation();
  const ease = EASING_MAP[name] ?? "easeInOut";

  async function trigger() {
    if (playing) return;
    setPlaying(true);
    await controls.start({ x: "calc(100% - 24px)", transition: { duration: 0.8, ease: ease as any } });
    await controls.start({ x: 0, transition: { duration: 0.4, ease: "easeIn" } });
    setPlaying(false);
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onClick={trigger}
      className="flex flex-col gap-5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 p-6 md:p-8 rounded-2xl cursor-pointer group select-none"
    >
      {/* Track */}
      <div className="relative h-10 bg-white/[0.04] rounded-xl border border-white/5 overflow-hidden">
        <motion.div
          animate={controls}
          initial={{ x: 0 }}
          className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 rounded-full bg-[var(--gfk-color-brand-default)] shadow-[0_0_12px_var(--gfk-color-brand-default)]"
        />
        <AnimatePresence>
          {!playing && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] text-white/30 uppercase tracking-widest"
            >
              click to play
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] text-white/80 group-hover:text-white transition-colors">
          motion.easing.<span className="text-[var(--gfk-color-brand-default)]">{name}</span>
        </span>
        <span className="font-mono text-[10px] text-white/30 break-all leading-relaxed">{value}</span>
      </div>
    </motion.div>
  );
}

export default function MotionPage() {
  const motionTokens = (tokens as any).motion;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="max-w-6xl flex flex-col gap-24 lg:gap-32 font-sans pt-12 md:pt-0">
      <motion.div variants={item} className="flex flex-col gap-8">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight">Motion</h1>
        <p className="text-white/60 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
          Duration scales and easing curves. Hover a duration row to see it animate. Click an easing card to play the curve.
        </p>
      </motion.div>

      <motion.div variants={item} className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

      {/* Duration */}
      <motion.div variants={item} className="flex flex-col gap-10">
        <h2 className="text-[10px] font-mono text-[var(--gfk-color-brand-default)] uppercase tracking-[0.25em] pl-1 border-l-2 border-[var(--gfk-color-brand-default)]">
          Duration Scale
        </h2>
        <div className="flex flex-col gap-3">
          {Object.entries(motionTokens.duration).map(([key, obj]: any) => (
            <DurationRow key={key} name={key} value={obj.value} />
          ))}
        </div>
      </motion.div>

      {/* Easing */}
      <motion.div variants={item} className="flex flex-col gap-10">
        <h2 className="text-[10px] font-mono text-white/60 uppercase tracking-[0.25em] pl-1 border-l-2 border-white/20">
          Easing Curves
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(motionTokens.easing).map(([key, obj]: any) => (
            <EasingCard key={key} name={key} value={obj.value} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
