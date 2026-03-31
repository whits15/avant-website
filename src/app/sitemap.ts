import type { MetadataRoute } from 'next';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.avantai.ca';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapData: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: new Date('2026-03-23'),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date('2026-03-23'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date('2026-03-23'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/case-studies`,
            lastModified: new Date('2026-03-23'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date('2026-03-23'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date('2026-03-23'),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    try {
        const reader = createReader(process.cwd(), keystaticConfig);
        const postSlugs = await reader.collections.posts.list();

        for (const slug of postSlugs) {
            const post = await reader.collections.posts.read(slug);

            if (post && !post.draft) {
                sitemapData.push({
                    url: `${baseUrl}/blog/${slug}`,
                    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
                    priority: 0.6,
                });
            }
        }
    } catch (error) {
        console.error('Failed to generate blog sitemap entries:', error);
    }

    return sitemapData;
}
