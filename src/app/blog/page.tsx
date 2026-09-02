import Link from "next/link";
import { SiteNav } from "@/components/ui/SiteNav";
import { getPosts } from "@/lib/fetchers";
import type { PostMeta } from "@/lib/types";

export const revalidate = 30;

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <main className="bg-grid min-h-screen">
      <SiteNav />
      <div className="shell page">
        <header className="max-w-2xl">
          <p className="eyebrow"><span className="status-dot" /> Field notes</p>
          <h1 className="display">Things we<br /><span className="text-cyan-300">learned building.</span></h1>
          <p className="lede">Build logs, technical notes and occasional rants from inside the workshop.</p>
        </header>

        <div className="mt-14 space-y-3">
          {posts.length === 0 && <div className="card text-sm text-slate-500">No notes published yet.</div>}
          {posts.map((post: PostMeta, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card group grid gap-5 md:grid-cols-[72px_1fr_auto] md:items-center">
              <span className="font-mono text-xs text-slate-600">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-100 transition group-hover:text-cyan-200">{post.title}</h2>
                  {post.tags?.slice(0, 2).map((tag) => <span key={tag} className="chip">{tag}</span>)}
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{post.summary}</p>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-slate-600 md:text-right">
                <div>{new Date(post.date).toLocaleDateString()}</div>
                <div className="mt-1">{post.readingMinutes ?? 3} min</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
