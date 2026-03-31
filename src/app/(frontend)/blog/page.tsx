import type { Metadata } from "next";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../../keystatic.config";
import BlogCard from "@/components/BlogCard";
import styles from "./blog.module.css";

export const metadata: Metadata = {
    title: "AI Insights for Ontario Businesses",
    description:
        "Practical AI insights, guides, and case studies for Ontario businesses. Learn how to implement AI that delivers real ROI.",
    alternates: { canonical: '/blog' },
};

const reader = createReader(process.cwd(), keystaticConfig);

export default async function BlogPage() {
    const postSlugs = await reader.collections.posts.list();

    const allPosts = await Promise.all(
        postSlugs.map(async (slug) => {
            const post = await reader.collections.posts.read(slug);
            return { slug, ...post };
        })
    );

    // Filter out drafts and sort by date (newest first)
    const posts = allPosts
        .filter((post) => post && !post.draft)
        .sort((a, b) => {
            const dateA = a.publishedAt
                ? new Date(a.publishedAt).getTime()
                : 0;
            const dateB = b.publishedAt
                ? new Date(b.publishedAt).getTime()
                : 0;
            return dateB - dateA;
        });

    return (
        <>
            <div style={{ height: "var(--nav-height)" }} />
            <section className={`section ${styles.blogSection}`}>
                <div className="container">
                    <p className="section-label">Blog</p>
                    <h1 className="section-title">
                        AI insights for Ontario businesses.
                    </h1>
                    <p className="section-subtitle">
                        Practical guides, case studies, and AI strategies you can
                        implement today.
                    </p>

                    {posts.length === 0 ? (
                        <div className={styles.empty}>
                            <p>No posts yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {posts.map((post) => (
                                <BlogCard
                                    key={post.slug}
                                    post={{
                                        slug: post.slug,
                                        title:
                                            typeof post.title === "string"
                                                ? post.title
                                                : post.slug,
                                        excerpt: post.excerpt || null,
                                        author: post.author || null,
                                        publishedAt: post.publishedAt || null,
                                        coverImage: post.coverImage || null,
                                        tags: [...(post.tags || [])],
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
