// /app/components/LoadingPage.tsx
export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-gray-400 dark:text-white/30">Loading...</p>
      </div>
    </div>
  );
}