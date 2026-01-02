export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    </div>
  )
}
