"use client";

import tokens from "../../system-dist/json/tokens.json";
import { motion } from "framer-motion";

export default function SpacingPage() {
  const spacing = tokens.spacing as any;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="max-w-6xl flex flex-col gap-24 lg:gap-32 font-sans pt-12 md:pt-0">
      <motion.div variants={item} className="flex flex-col gap-8">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight">Spacing</h1>
        <p className="text-white/50 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
          The strict 4px modular block architecture. Translating mathematical increments into harmonious visual structures globally.
        </p>
      </motion.div>

      <motion.div variants={item} className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

      <motion.div variants={item} className="flex flex-col gap-8 relative">
        <div className="flex text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 pb-4 mb-2 px-6 absolute top-[-40px] w-full border-b border-white/5">
          <div className="w-40 hidden md:block pl-2">Token Path</div>
          <div className="w-32 hidden md:block">Value</div>
          <div className="hidden md:block">Physical Scale</div>
        </div>
        
        {Object.entries(spacing).sort(([a]: any, [b]: any) => Number(a) - Number(b)).map(([key, obj]: any) => (
          <motion.div 
            whileHover={{ x: 12, backgroundColor: "rgba(255,255,255,0.02)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            key={key} 
            className="flex flex-col md:flex-row md:items-center text-sm py-5 px-8 rounded-2xl transition-colors group border border-transparent hover:border-white/10 backdrop-blur-sm"
          >
            <div className="md:w-40 font-mono text-[11px] text-white/40 group-hover:text-[var(--gfk-color-brand-default)] transition-colors mb-3 md:mb-0">
              spacing.{key}
            </div>
            <div className="md:w-32 font-mono text-[10px] text-white/30 mb-5 md:mb-0 flex items-center">
              <span className="bg-black/50 border border-white/5 px-2.5 py-1.5 rounded-md shadow-inner">{obj.value}</span>
            </div>
            <div className="flex-1 flex items-center">
              <div 
                className="bg-gradient-to-r from-[var(--gfk-color-brand-default)] to-white/20 h-10 md:h-14 rounded-xl opacity-80 group-hover:opacity-100 transition-all shadow-[0_0_15px_rgba(192,72,40,0.0)] group-hover:shadow-[0_0_20px_rgba(192,72,40,0.15)] relative overflow-hidden" 
                style={{ width: `var(--gfk-spacing-${key})` }}
              >
                {/* Architectural diagonal hatching */}
                <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #fff 4px, #fff 8px)' }} />
                <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(255,255,255,0.2)]" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
