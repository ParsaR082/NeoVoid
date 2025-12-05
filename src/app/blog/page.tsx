import { getPosts } from "@/lib/fetchers";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-grid min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-16 space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">
            Blog
          </p>
          <h1 className="text-3xl font-semibold text-slate-50">Field Notes</h1>
          <p className="text-slate-400">
            Experience dumps, build logs, and technical rants.
          </p>
        </header>

        <div className="space-y-4">
          {posts.length === 0 && (
            <div className="card text-slate-400">
              {"No posts yet. Seed KV with blog:index and blog:post:{slug}."}
            </div>
          )}

          {posts.map((post) => (
            <article key={post.id} className="card space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-50">
                  {post.title}
                </h3>
                <span className="text-xs text-slate-500">
                  {new Date(post.publishedAt).toDateString()}
                </span>
              </div>
              <p className="text-sm text-slate-400">{post.excerpt}</p>
              {post.tags && (
                <div className="flex flex-wrap gap-2 text-xs text-cyan-200">
                  {post.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
