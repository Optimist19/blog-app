import RenderBlock from "@/components/RenderBlock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Eye } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  });

  if (!res) {
    return {
      title: "Blog not found"
    };
  }
  const result = await res.json();
  const blog = result.message;

  return {
    title: blog.title,
    description: blog.desc
  };
}

async function BlogId({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();

  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  });

  const result = await res.json();
  const blog = result.message;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl transition-all duration-300 transform`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/blogs">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 -ml-2 transition-colors cursor-pointer">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back</span>
            </Button>
          </Link>
        </div>
      </nav>

      <article className="relative pt-20">
        <section className="relative overflow-hidden">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-8">
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl aspect-video">
              <Image
                src={blog.banner || "/blog-banner.jpg"}
                alt={blog.title}
                fill
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-8">
            <div
              className="flex flex-wrap items-center gap-3 mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <Clock size={14} />
                <span>5 min read</span>
              </div>

              <span className="text-slate-300 dark:text-slate-700">·</span>

              <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <Eye size={14} />
                <span> 5 views</span>
              </div>
            </div>

            <h1
              className="text-5xl text-center sm:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.2s" }}>
              {blog.title}
            </h1>

            <p
              className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light opacity-0 animate-fade-in"
              style={{ animationDelay: "0.3s" }}>
              {blog.desc}
            </p>

            <div
              className="flex items-center gap-4 pb-8 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.4s" }}>
              <Avatar className="h-14 w-14 ring-2 ring-indigo-200 dark:ring-indigo-800/50 shadow-lg">
                <AvatarImage src="/profile.jpg" alt="author-icon" />
                <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-lg">
                  {blog.author?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {blog.author}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Published on {new Date(blog.date).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
          </div>

          <Separator className="max-w-3xl mx-auto opacity-50" />
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-slate">
            <RenderBlock content={blog.content} />
          </div>

          <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col items-center gap-6">
              <p className="text-center text-slate-600 dark:text-slate-400 text-lg font-medium">
                Did you find this article helpful?
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}

export default BlogId;
