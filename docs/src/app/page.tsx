"use client";

import tokens from "../system-dist/json/tokens.json";
import { motion } from "framer-motion";

export default function ColorsPage() {
  const semanticColors = tokens.color as any;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="max-w-6xl flex flex-col gap-24 lg:gap-32 font-sans pt-12 md:pt-0">
      
      <motion.div variants={item} className="flex flex-col gap-8">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight">System Colors</h1>
        <p className="text-white/50 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
          The algorithmic color primitives and their semantic mappings automatically mapped from our central JSON dictionary sequence.
        </p>
      </motion.div>

      <motion.div variants={item} className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

      {/* Semantic Swatches */}
      <motion.div variants={item} className="flex flex-col gap-12 lg:gap-16">
        <h2 className="text-[10px] font-mono text-[var(--gfk-color-brand-default)] uppercase tracking-[0.25em] pl-1">Semantic Aliases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {["brand", "surface", "text", "border", "status"].map(category => (
            <div key={category} className="flex flex-col gap-5">
              <h3 className="capitalize font-mono text-[10px] tracking-[0.2em] text-white/30 mb-1 pl-3 border-l border-[var(--gfk-color-brand-default)]/30">{category}</h3>
              {Object.entries(semanticColors[category] || {}).map(([variant, obj]: any) => (
                <motion.div 
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  key={variant} 
                  className="flex items-center gap-6 bg-white/[0.015] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 p-5 rounded-2xl transition-all backdrop-blur-xl cursor-crosshair group shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]"
                >
                  <div 
                    className="w-12 h-12 rounded-full border border-white/10 shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_20px_currentColor] transition-shadow duration-500" 
                    style={{ backgroundColor: `var(--gfk-color-${category}-${variant})`, color: `var(--gfk-color-${category}-${variant})` }} 
                  />
                  <div className="flex flex-col gap-1.5 overflow-hidden">
                    <span className="font-bold tracking-wide text-white/80 group-hover:text-white transition-colors text-sm truncate">color.{category}.{variant}</span>
                    <span className="font-mono text-[10px] text-white/30 group-hover:text-white/60 transition-colors uppercase">{obj.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Raw Primitives Swatches */}
      <motion.div variants={item} className="flex flex-col gap-12 lg:gap-16">
        <h2 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em] pl-1">Base Primitives</h2>
        <div className="flex flex-col gap-12 lg:gap-16">
          {["coral", "gray"].map(palette => (
            <div key={palette} className="flex flex-col gap-6">
              <h3 className="capitalize font-mono text-[10px] tracking-[0.2em] text-white/30 pl-3 border-l border-white/10">{palette} Base Scale</h3>
              <div className="flex h-32 md:h-40 lg:h-48 rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm bg-black/50">
                {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map(weight => (
                  <motion.div 
                    whileHover={{ flex: 1.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    key={weight}
                    className="flex-1 flex flex-col justify-end p-2 md:p-3 items-center gap-2 group cursor-ew-resize relative overflow-hidden transition-colors"
                    style={{ backgroundColor: `var(--gfk-color-base-${palette}-${weight})` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex flex-col items-center justify-center mix-blend-difference text-white pointer-events-none">
                      <span className="font-mono text-[10px] tracking-widest bg-black/30 backdrop-blur-md px-2 py-1 rounded-md">{weight}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
}
