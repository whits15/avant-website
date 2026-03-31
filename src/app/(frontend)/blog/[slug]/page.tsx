import type { Metadata } from "next";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../../../keystatic.config";
import { notFound } from "next/navigation";
import styles from "./post.module.css";

type Props = {
    params: Promise<{ slug: string }>;
};

const reader = createReader(process.cwd(), keystaticConfig);

export async function generateStaticParams() {
    const slugs = await reader.collections.posts.list();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await reader.collections.posts.read(slug);

    if (!post) return { title: "Post Not Found" };

    return {
        title: post.title,
        description: post.excerpt || `${typeof post.title === "string" ? post.title : slug} — Avant Blog`,
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
            title: typeof post.title === "string" ? post.title : slug,
            description: post.excerpt || '',
            type: 'article',
            publishedTime: post.publishedAt || undefined,
            authors: post.author ? [post.author] : undefined,
            images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630 }] : undefined,
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await reader.collections.posts.read(slug);

    if (!post || post.draft) notFound();

    const publishedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : null;

    const title = typeof post.title === "string" ? post.title : slug;

    // Render Markdoc content to React nodes
    const { default: Markdoc } = await import("@markdoc/markdoc");
    const contentData = await (post as any).content();
    const tree = Markdoc.transform(contentData.node);
    const rendered = Markdoc.renderers.react(tree, await import("react"));

    return (
        <>
            <div style={{ height: "var(--nav-height)" }} />
            <article className={styles.article}>
                <div className="container container--narrow">
                    <header className={styles.header}>
                        <a href="/blog" className={styles.back}>
                            ← Back to Blog
                        </a>
                        <h1 className={styles.title}>{title}</h1>
                        <div className={styles.meta}>
                            {post.author && (
                                <span className={styles.author}>
                                    {post.author}
                                </span>
                            )}
                            {publishedDate && (
                                <span className={styles.date}>
                                    {publishedDate}
                                </span>
                            )}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                            <div className={styles.tags}>
                                {post.tags.map((tag, i) => (
                                    <span key={i} className={styles.tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>

                    {post.coverImage && (
                        <div className={styles.coverWrap}>
                            <img
                                src={post.coverImage}
                                alt={title}
                                className={styles.coverImage}
                            />
                        </div>
                    )}

                    <div className={styles.content}>{rendered}</div>

                    <footer className={styles.footer}>
                        <a href="/blog" className="btn btn--secondary">
                            ← All Posts
                        </a>
                        <a href="/contact#booking" className="btn btn--primary">
                            Book Free Assessment
                        </a>
                    </footer>
                </div>
            </article>

            {/* Article structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: title,
                        description: post.excerpt || "",
                        author: {
                            "@type": "Person",
                            name: post.author || "Avant Team",
                        },
                        datePublished: post.publishedAt,
                        publisher: {
                            "@type": "Organization",
                            name: "Avant",
                        },
                    }),
                }}
            />
        </>
    );
}
