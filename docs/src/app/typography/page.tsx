"use client";

import tokens from "../../system-dist/json/tokens.json";
import { motion } from "framer-motion";

export default function TypographyPage() {
  const typo = tokens.font as any;
  
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="max-w-6xl flex flex-col gap-24 lg:gap-32 font-sans pt-12 md:pt-0">
      <motion.div variants={item} className="flex flex-col gap-8">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight">Typography</h1>
        <p className="text-white/50 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
          The typographic hierarchy establishing the strategic identity parameters and spatial rhythm constraints natively across all digital touchpoints.
        </p>
      </motion.div>

      <motion.div variants={item} className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

      {/* Families */}
      <motion.div variants={item} className="flex flex-col gap-12 lg:gap-16">
        <h2 className="text-[10px] font-mono text-[var(--gfk-color-brand-default)] uppercase tracking-[0.25em] pl-1 border-l border-[var(--gfk-color-brand-default)]/30">Font Families</h2>
        <div className="flex flex-col gap-8 lg:gap-12">
          {Object.entries(typo.family).map(([key, obj]: any) => (
            <motion.div 
              whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.02)" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              key={key} 
              className="flex flex-col gap-8 bg-white/[0.01] p-8 md:p-12 lg:p-16 rounded-3xl border border-white/5 hover:border-white/10 group relative overflow-hidden backdrop-blur-sm"
            >
              {/* Massive background dropcap */}
              <div className="absolute right-[-5%] top-[-20%] text-[200px] md:text-[300px] leading-none opacity-[0.015] font-serif pointer-events-none group-hover:scale-105 group-hover:opacity-[0.03] transition-all duration-1000">
                Ag
              </div>
              
              <div className="flex items-center gap-4 relative z-10">
                <span className="w-2 h-2 rounded-full bg-[var(--gfk-color-brand-default)] shadow-[0_0_10px_var(--gfk-color-brand-default)]" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-50 text-white">font.family.{key}</span>
              </div>
              <div style={{ fontFamily: `var(--gfk-font-family-${key})` }} className="text-5xl md:text-7xl lg:text-[100px] leading-[0.9] tracking-tight text-white/90 group-hover:text-white transition-colors relative z-10">
                Grafikui<br/>System.
              </div>
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.25em] relative z-10">{obj.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Sizes */}
      <motion.div variants={item} className="flex flex-col gap-12 lg:gap-16">
        <h2 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em] pl-1 border-l border-white/10">Hierarchy Matrix</h2>
        <div className="flex flex-col">
          {Object.entries(typo.size).map(([key, obj]: any) => (
            <motion.div 
              whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.02)" }}
              key={key} 
              className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 py-8 md:py-10 transition-colors px-4 md:px-8 rounded-2xl group cursor-default"
            >
              <div className="flex flex-col gap-8 md:gap-12 w-full md:w-3/4">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--gfk-color-brand-default)] opacity-70">font.size.{key}</span>
                <div style={{ fontSize: `var(--gfk-font-size-${key})` }} className="font-serif leading-[1.1] tracking-tight text-white/80 group-hover:text-white transition-colors truncate">
                  The quick brown fox jumps over the lazy dog.
                </div>
              </div>
              <span className="font-mono text-[10px] text-white/30 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full mt-6 md:mt-0 whitespace-nowrap hidden md:block group-hover:border-white/20 transition-colors">
                {obj.value}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
