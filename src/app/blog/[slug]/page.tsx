import { getPost } from "@/lib/blog";
import { notFound } from "next/navigation";

export const revalidate = 30;

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) return notFound();

  return (
    <div className="bg-grid min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <article className="space-y-8">
          <header className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
              {post.tags.join(" · ")}
            </p>
            <h1 className="text-4xl font-semibold text-slate-50">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>{new Date(post.date).toDateString()}</span>
              <span>·</span>
              <span>~{post.readingMinutes} min read</span>
            </div>
          </header>

          <div className="relative">
            <div className="absolute left-[-1.25rem] top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-blue-500/60 to-transparent opacity-60" />
            <div
              className="prose prose-invert max-w-none prose-p:text-slate-200 prose-li:text-slate-200 prose-headings:text-slate-50 prose-strong:text-slate-50 prose-code:text-cyan-200"
              dangerouslySetInnerHTML={{ __html: post.html ?? "" }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
