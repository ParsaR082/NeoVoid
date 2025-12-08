import { createPost } from "../src/lib/blog";

async function main() {
  const samples = [
    {
      title: "Signal Drift",
      summary: "How we stabilized edge telemetry paths under packet loss.",
      tags: ["edge", "telemetry"],
      slug: "signal-drift",
      content: `# Signal Drift

We tuned buffering and backoff on noisy links. Here is what we learned.

- Adaptive jitter buffers
- Backpressure aware queues
- Observability on the edges`,
    },
    {
      title: "Silent Interfaces",
      summary: "Designing quiet, minimal UIs for high-focus workflows.",
      tags: ["design", "ui"],
      slug: "silent-interfaces",
      content: `# Silent Interfaces

Less chrome, more clarity. Patterns we use to keep ops surfaces calm.

1. Motion only with intent
2. Reduced palettes with neon accents
3. Typography that guides, not shouts`,
    },
  ];

  for (const post of samples) {
    await createPost(post);
    console.log(`Seeded ${post.slug}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
