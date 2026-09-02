import Link from "next/link";
import { getPost } from "@/lib/blog";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/ui/SiteNav";

export const revalidate = 30;
export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return notFound();

  return (
    <main className="bg-grid min-h-screen">
      <SiteNav />
      <div className="shell page">
        <article className="mx-auto max-w-3xl">
          <Link href="/blog" className="font-mono text-[10px] uppercase tracking-[.16em] text-slate-600 hover:text-cyan-300">← Back to notes</Link>
          <header className="mt-12">
            <div className="flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}</div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-50 md:text-5xl">{post.title}</h1>
            <div className="mt-5 flex gap-4 font-mono text-[10px] uppercase tracking-wider text-slate-600">
              <span>{new Date(post.date).toLocaleDateString()}</span><span>·</span><span>{post.readingMinutes} min read</span>
            </div>
          </header>
          <div className="mt-12 divider" />
          <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: post.html ?? "" }} />
        </article>
      </div>
    </main>
  );
}
