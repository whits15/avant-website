import { config, fields, collection } from "@keystatic/core";

export default config({
    storage: {
        kind: "cloud",
    },
    cloud: {
        project: "landship/avant",
    },
    collections: {
        posts: collection({
            label: "Blog Posts",
            slugField: "title",
            path: "content/posts/*",
            format: { contentField: "content" },
            schema: {
                title: fields.slug({ name: { label: "Title" } }),
                excerpt: fields.text({
                    label: "Excerpt",
                    description:
                        "Brief summary shown on blog listing cards (1–2 sentences)",
                    multiline: true,
                }),
                coverImage: fields.image({
                    label: "Cover Image",
                    description:
                        "Featured image displayed on listings and the post header",
                    directory: "public/images/posts",
                    publicPath: "/images/posts",
                }),
                category: fields.select({
                    label: "Category",
                    description: "Primary category for this post",
                    options: [
                        { label: "AI Strategy", value: "ai-strategy" },
                        { label: "Case Study", value: "case-study" },
                        { label: "Guide", value: "guide" },
                        { label: "Industry News", value: "industry-news" },
                        { label: "Company Update", value: "company-update" },
                    ],
                    defaultValue: "ai-strategy",
                }),
                author: fields.text({
                    label: "Author",
                    defaultValue: "Avant Team",
                }),
                tags: fields.array(fields.text({ label: "Tag" }), {
                    label: "Tags",
                    description: "Tags for filtering and SEO",
                    itemLabel: (props) => props.value,
                }),
                publishedAt: fields.date({
                    label: "Published Date",
                    description: "Publication date for this post",
                }),
                draft: fields.checkbox({
                    label: "Draft",
                    description:
                        "Draft posts are hidden from the blog listing",
                    defaultValue: false,
                }),
                content: fields.markdoc({
                    label: "Content",
                    description: "The full body content of the blog post",
                    options: {
                        image: {
                            directory: "public/images/posts/content",
                            publicPath: "/images/posts/content/",
                        },
                    },
                }),
            },
        }),
    },
});
