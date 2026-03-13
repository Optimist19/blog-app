import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoveLeft } from "lucide-react";
import Link from "next/link";

function Blogs() {
  return (
    <div className="relative">
      <div className="px-[10%] flex items-center justify-between pt-3">
        <nav
          className={`fixed top-0 left-0 right-0 z-50 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl transition-all duration-300 transform`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 -ml-2 transition-colors cursor-pointer">
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back</span>
              </Button>
            </Link>

            {/* {Search input has to be here} */}
            <Link href="/create-blog">
              <Button
                variant={"link"}
                className="gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 -ml-2 transition-colors cursor-pointer">
                Create Blog
              </Button>
            </Link>
          </div>
        </nav>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <BlogCard />
      </main>
    </div>
  );
}

export default Blogs;
