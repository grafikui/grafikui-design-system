"use client";

import tokens from "../../system-dist/json/tokens.json";
import { motion } from "framer-motion";

export default function RadiusPage() {
  const radius = (tokens as any).radius;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  const sizeMap: Record<string, string> = {
    none: "w-24 h-24",
    sm: "w-24 h-24",
    md: "w-28 h-28",
    lg: "w-32 h-32",
    xl: "w-36 h-36",
    "2xl": "w-40 h-40",
    full: "w-40 h-40",
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="max-w-6xl flex flex-col gap-24 lg:gap-32 font-sans pt-12 md:pt-0">
      <motion.div variants={item} className="flex flex-col gap-8">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight">Radius</h1>
        <p className="text-white/50 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
          Border radius tokens. A deliberate scale from sharp to fully circular — each step carries intentional visual weight.
        </p>
      </motion.div>

      <motion.div variants={item} className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

      {/* Visual scale */}
      <motion.div variants={item} className="flex flex-col gap-12 lg:gap-16">
        <h2 className="text-[10px] font-mono text-[var(--gfk-color-brand-default)] uppercase tracking-[0.25em] pl-1 border-l border-[var(--gfk-color-brand-default)]/30">Scale</h2>
        <div className="flex flex-wrap gap-8 lg:gap-12 items-end">
          {Object.entries(radius).map(([key, obj]: any) => (
            <motion.div
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              key={key}
              className="flex flex-col items-center gap-5 group cursor-default"
            >
              <div
                className={`${sizeMap[key] || "w-32 h-32"} bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 group-hover:border-[var(--gfk-color-brand-default)]/40 group-hover:bg-gradient-to-br group-hover:from-[var(--gfk-color-brand-default)]/10 group-hover:to-transparent shadow-xl group-hover:shadow-[0_0_30px_rgba(192,72,40,0.1)] transition-all duration-500 backdrop-blur-sm`}
                style={{ borderRadius: obj.value }}
              />
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-mono text-[11px] text-[var(--gfk-color-brand-default)] opacity-70 group-hover:opacity-100 transition-opacity">radius.{key}</span>
                <span className="font-mono text-[10px] text-white/25 bg-black/50 border border-white/5 px-2.5 py-1 rounded-md">{obj.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Table reference */}
      <motion.div variants={item} className="flex flex-col gap-6">
        <h2 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em] pl-1 border-l border-white/10">Reference</h2>
        <div className="flex flex-col border border-white/5 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white/20 px-6 py-4 border-b border-white/5 bg-white/[0.01]">
            <span>Token</span><span>Value</span><span>CSS Variable</span>
          </div>
          {Object.entries(radius).map(([key, obj]: any) => (
            <motion.div
              whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              key={key}
              className="grid grid-cols-3 px-6 py-5 border-b border-white/5 last:border-b-0 group"
            >
              <span className="font-mono text-[11px] text-[var(--gfk-color-brand-default)] opacity-70 group-hover:opacity-100 transition-opacity">radius.{key}</span>
              <span className="font-mono text-[10px] text-white/40">{obj.value}</span>
              <span className="font-mono text-[10px] text-white/25">--gfk-radius-{key}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
