import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { BookOpen, HomeIcon, PenTool } from "lucide-react";
import Link from "next/link";

export default  function Home() {

  return (
    <main className="">
      <section className="relative  border-b">
        <div className="mx-auto max-w-7xl px-6 py-24 grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6 animate-in fade-in slide-in-from-left-6 duration-500">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl">
              Thoughts, tutorials <br />
              <span className="text-primary">and ideas worth sharing</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              A space for long-form writing, careful thinking, and ideas shaped
              through experience.
            </p>

            <div className="flex gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/blogs">Explore Blogs</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/create-blog">Write an Article</Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-6 duration-500">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl" />
            <div className="relative rounded-2xl border bg-background p-8 shadow-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Featured insight
              </p>
              <h3 className="text-xl font-semibold leading-snug">
                Crafting ideas that deserve to be read
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Carefully written posts focused on clarity, depth, and practical
                insight.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="#" className="group">
            <Card className="h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
              <CardHeader>
                <HomeIcon className="h-6 w-6 text-primary mb-3" />
                <CardTitle>Home</CardTitle>
                <CardDescription>Welcome </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Curated articles, featured stories, and the latest writing from
                the platform.
              </CardContent>
            </Card>
          </Link>

          <Link href="/blogs" className="group">
            <Card className="h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
              <CardHeader>
                <BookOpen className="h-6 w-6 text-primary mb-3" />
                <CardTitle>Blog</CardTitle>
                <CardDescription>In-depth writing</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Explore posts and real-world architecture decisions.
              </CardContent>
            </Card>
          </Link>

          <Link href="/create-blog" className="group">
            <Card className="h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
              <CardHeader>
                <PenTool className="h-6 w-6 text-primary mb-3" />
                <CardTitle>Create</CardTitle>
                <CardDescription>Share your own knowledge</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Write and publish new articles for the community to read and
                learn from.
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </main>
  );
}
