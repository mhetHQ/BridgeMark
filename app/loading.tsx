export default function Loading() {
  return (
    <div className="dark w-full min-h-screen bg-black text-white flex items-center justify-center">
      <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-20" />
      
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/10 rounded-full" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin" />
        </div>
        <p className="text-gray-400 text-sm font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
