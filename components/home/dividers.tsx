"use client"

export function DotDivider() {
  return (
    <div className="w-full py-4 flex items-center justify-center relative z-30 bg-transparent my-[-34px]">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/10"></div>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent w-3/4 mx-auto"></div>
      <div className="relative bg-black p-3 border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse"></div>
      </div>
    </div>
  )
}

export function SyncDivider({ text = "Sync" }: { text?: string }) {
  return (
    <div className="w-full bg-black py-3 flex items-center justify-center relative z-20 overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/5"></div>
      <div className="relative bg-black px-6 py-2 border border-white/5 rounded-full flex items-center gap-4">
        <div className="flex gap-1">
          <div className="w-0.5 h-3 bg-white/20"></div>
          <div className="w-0.5 h-3 bg-white/20"></div>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
          {text}
        </span>
        <div className="flex gap-1">
          <div className="w-0.5 h-3 bg-white/20"></div>
          <div className="w-0.5 h-3 bg-emerald-500"></div>
        </div>
      </div>
    </div>
  )
}
