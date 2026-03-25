import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
import { Hexagon, Type, Grid3X3, ArrowUpRight, CircleDashed, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: "Grafikui Design System Engine",
  description: "Token-first visual architecture infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-[#050505] text-[var(--gfk-color-text-primary)] selection:bg-[var(--gfk-color-brand-default)] selection:text-white flex flex-col md:flex-row relative">
        
        {/* Ambient Glows */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--gfk-color-brand-default)]/20 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        
        {/* Noise Texture */}
        <div className="fixed inset-0 bg-noise z-50 pointer-events-none mix-blend-overlay" />

        {/* Sidebar */}
        <aside className="w-full md:w-[320px] shrink-0 border-b md:border-b-0 md:border-r border-white/5 bg-black/60 backdrop-blur-2xl p-8 lg:p-12 flex flex-col gap-16 md:sticky top-0 md:h-screen z-40 overflow-y-auto">
          <div className="flex flex-col gap-3">
            <h1 className="font-serif italic text-4xl lg:text-5xl tracking-tight text-white/90">
              Grafikui
            </h1>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--gfk-color-brand-default)] opacity-90 pl-1">
              Design Engine
            </span>
          </div>

          <nav className="flex flex-col gap-3 flex-1">
            <Link href="/" className="px-5 py-4 flex items-center gap-4 text-white/40 hover:text-white hover:bg-white-[0.03] rounded-xl transition-all border border-transparent hover:border-white/10 group shadow-sm hover:shadow-xl hover:shadow-[var(--gfk-color-brand-default)]/5 bg-gradient-to-r hover:from-white/[0.03] hover:to-transparent">
              <Hexagon className="w-4 h-4 group-hover:text-[var(--gfk-color-brand-default)] transition-colors" />
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Colors</span>
            </Link>
            <Link href="/typography" className="px-5 py-4 flex items-center gap-4 text-white/40 hover:text-white hover:bg-white-[0.03] rounded-xl transition-all border border-transparent hover:border-white/10 group shadow-sm hover:shadow-xl hover:shadow-[var(--gfk-color-brand-default)]/5 bg-gradient-to-r hover:from-white/[0.03] hover:to-transparent">
              <Type className="w-4 h-4 group-hover:text-[var(--gfk-color-brand-default)] transition-colors" />
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Typography</span>
            </Link>
            <Link href="/spacing" className="px-5 py-4 flex items-center gap-4 text-white/40 hover:text-white hover:bg-white-[0.03] rounded-xl transition-all border border-transparent hover:border-white/10 group shadow-sm hover:shadow-xl hover:shadow-[var(--gfk-color-brand-default)]/5 bg-gradient-to-r hover:from-white/[0.03] hover:to-transparent">
              <Grid3X3 className="w-4 h-4 group-hover:text-[var(--gfk-color-brand-default)] transition-colors" />
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Spatial Grid</span>
            </Link>
            <Link href="/radius" className="px-5 py-4 flex items-center gap-4 text-white/40 hover:text-white hover:bg-white-[0.03] rounded-xl transition-all border border-transparent hover:border-white/10 group shadow-sm hover:shadow-xl hover:shadow-[var(--gfk-color-brand-default)]/5 bg-gradient-to-r hover:from-white/[0.03] hover:to-transparent">
              <CircleDashed className="w-4 h-4 group-hover:text-[var(--gfk-color-brand-default)] transition-colors" />
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Radius</span>
            </Link>
            <Link href="/motion" className="px-5 py-4 flex items-center gap-4 text-white/40 hover:text-white hover:bg-white-[0.03] rounded-xl transition-all border border-transparent hover:border-white/10 group shadow-sm hover:shadow-xl hover:shadow-[var(--gfk-color-brand-default)]/5 bg-gradient-to-r hover:from-white/[0.03] hover:to-transparent">
              <Zap className="w-4 h-4 group-hover:text-[var(--gfk-color-brand-default)] transition-colors" />
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Motion</span>
            </Link>
          </nav>

          <a href="https://github.com/omrdev1/grafikui_design_system" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors w-fit group">
            <span className="border-b border-transparent group-hover:border-white/20 pb-0.5">Repository</span>
            <ArrowUpRight className="w-3 h-3 group-hover:text-[var(--gfk-color-brand-default)] transition-colors" />
          </a>
        </aside>

        <main className="flex-1 p-6 sm:p-12 md:p-16 lg:p-24 overflow-x-hidden relative z-10 min-h-[100dvh]">
          {children}
        </main>
      </body>
    </html>
  );
}
