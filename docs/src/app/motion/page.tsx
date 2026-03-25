"use client";

import tokens from "../../system-dist/json/tokens.json";
import { motion } from "framer-motion";

export default function MotionPage() {
  const motionTokens = (tokens as any).motion;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="max-w-6xl flex flex-col gap-24 lg:gap-32 font-sans pt-12 md:pt-0">
      <motion.div variants={item} className="flex flex-col gap-8">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight">Motion</h1>
        <p className="text-white/50 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
          Duration scales and easing curves. Motion intent encoded as tokens — not magic numbers scattered across components.
        </p>
      </motion.div>

      <motion.div variants={item} className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

      {/* Duration */}
      <motion.div variants={item} className="flex flex-col gap-12 lg:gap-16">
        <h2 className="text-[10px] font-mono text-[var(--gfk-color-brand-default)] uppercase tracking-[0.25em] pl-1 border-l border-[var(--gfk-color-brand-default)]/30">Duration Scale</h2>
        <div className="flex flex-col gap-4">
          {Object.entries(motionTokens.duration).map(([key, obj]: any) => {
            const ms = parseInt(obj.value, 10) || 0;
            const maxMs = 1000;
            const widthPct = Math.min((ms / maxMs) * 100, 100);
            return (
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                key={key}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 bg-white/[0.015] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 p-6 md:p-8 rounded-2xl group cursor-default"
              >
                <div className="md:w-36 font-mono text-[11px] text-[var(--gfk-color-brand-default)] opacity-70 shrink-0">motion.duration.{key}</div>
                <div className="md:w-24 font-mono text-[10px] text-white/30 bg-black/50 border border-white/5 px-2.5 py-1.5 rounded-md shrink-0">{obj.value}</div>
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[var(--gfk-color-brand-default)] to-white/40 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPct}%` }}
                      transition={{ duration: ms / 1000, ease: "easeOut", delay: 0.4 }}
                    />
                  </div>
                  {/* Live animation preview */}
                  <motion.div
                    className="w-3 h-3 rounded-full bg-[var(--gfk-color-brand-default)] shrink-0 opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.6, 1] }}
                    transition={{ duration: ms / 1000, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Easing */}
      <motion.div variants={item} className="flex flex-col gap-12 lg:gap-16">
        <h2 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em] pl-1 border-l border-white/10">Easing Curves</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(motionTokens.easing).map(([key, obj]: any) => (
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              key={key}
              className="flex flex-col gap-6 bg-white/[0.015] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 p-6 md:p-8 rounded-2xl group cursor-default"
            >
              {/* Live easing preview */}
              <div className="relative h-16 overflow-hidden">
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--gfk-color-brand-default)] shadow-[0_0_10px_var(--gfk-color-brand-default)]"
                  animate={{ x: [0, 160, 0] }}
                  transition={{ duration: 1.6, ease: key === "linear" ? "linear" : key === "spring" ? [0.34, 1.56, 0.64, 1] as any : key === "snappy" ? [0.2, 0, 0, 1] as any : key === "ease-in" ? [0.4, 0, 1, 1] as any : key === "ease-out" ? [0, 0, 0.2, 1] as any : [0.4, 0, 0.2, 1] as any, repeat: Infinity, repeatDelay: 0.8 }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] text-[var(--gfk-color-brand-default)] opacity-80">motion.easing.{key}</span>
                <span className="font-mono text-[10px] text-white/25 break-all">{obj.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
