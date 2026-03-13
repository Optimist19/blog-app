function BlogDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 animate-pulse">
      
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
      </nav>

      <article className="relative pt-20">

        <section className="relative overflow-hidden">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-8">
            <div className="rounded-2xl shadow-2xl aspect-video bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-8">

            <div className="flex items-center gap-4 mb-6">
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-4 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>

            <div className="space-y-3 mb-6">
              <div className="h-10 w-full bg-slate-300 dark:bg-slate-700 rounded" />
              <div className="h-10 w-4/5 bg-slate-300 dark:bg-slate-700 rounded" />
            </div>

            <div className="space-y-2 mb-8">
              <div className="h-5 w-full bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>

            <div className="flex items-center gap-4 pb-8">
              <div className="h-14 w-14 rounded-full bg-slate-300 dark:bg-slate-700" />
              <div className="space-y-2">
                <div className="h-5 w-32 bg-slate-300 dark:bg-slate-700 rounded" />
                <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto border-t border-slate-200 dark:border-slate-800 opacity-50" />
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-6">

          <div className="space-y-4">
            <div className="h-5 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-5 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>

          <div className="space-y-4">
            <div className="h-5 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-5 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>

          <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-6">
            <div className="h-6 w-72 bg-slate-300 dark:bg-slate-700 rounded" />
          </div>
        </section>
      </article>
    </div>
  );
}

export default BlogDetailsSkeleton;