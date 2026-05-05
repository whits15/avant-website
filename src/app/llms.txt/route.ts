import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.avantai.ca';

export async function GET() {
    let blogLines = '';

    try {
        const reader = createReader(process.cwd(), keystaticConfig);
        const postSlugs = await reader.collections.posts.list();
        const posts = await Promise.all(
            postSlugs.map(async (slug) => ({ slug, post: await reader.collections.posts.read(slug) }))
        );

        const livePosts = posts
            .filter(({ post }) => post && !post.draft)
            .sort((a, b) => {
                const dateA = a.post?.publishedAt ? new Date(a.post.publishedAt).getTime() : 0;
                const dateB = b.post?.publishedAt ? new Date(b.post.publishedAt).getTime() : 0;
                return dateB - dateA;
            });

        blogLines = livePosts
            .map(({ slug, post }) => `- ${post?.title ?? slug}: ${baseUrl}/blog/${slug}`)
            .join('\n');
    } catch (error) {
        console.error('Failed to read blog posts for llms.txt:', error);
    }

    const content = `# Avant — AI Implementation for Canadian PE, VC & Family Offices

> Avant is an AI implementation consultancy for Canadian private equity, venture capital, and family offices. We design Claude-powered workflows that compress diligence, IC prep, LP reporting, and portfolio monitoring — shipped in 2–4 weeks.

## What we do
- Compress analyst hours across the investment process: deal sourcing, due diligence, IC prep, LP reporting, portfolio monitoring.
- Design simple, secure AI workflows around your real process. No bloated platforms. No "AI strategy" decks.
- Work specifically with Canadian PE firms, VC funds, and family offices.

## Services
- Rapid AI Assessment: 1–2 week site visit + structured interviews + written report with 3–5 ranked AI use cases (scoped builds + projected ROI).
- AI Implementation Sprints: 2–4 week focused engagements that ship a working AI workflow.
- Custom CRM & Application Development: production-grade systems with AI integrated where it creates real value.
- Monthly AI Retainer: fractional Chief AI Officer support for ongoing roadmap, monitoring, and team training.

## Founder
Patrick Alpaugh, MBA — Founder & CEO. Background: analyst in both Canadian private equity and venture capital, plus sales and operations roles inside PE/VC-backed companies. Most recently introduced an AI-powered inventory counting solution to the largest restaurant groups in Canada and personally owned every account.

## Pages
- Homepage: ${baseUrl}
- Services: ${baseUrl}/services
- About: ${baseUrl}/about
- Case Studies: ${baseUrl}/case-studies
- Blog: ${baseUrl}/blog
- Contact: ${baseUrl}/contact

## Case Studies
- Partner time back, every NDA — Contract analytics for a Canadian PE firm: ${baseUrl}/case-studies/pe-nda-review-automation
- 2 hours saved every morning — Automated daily meeting prep for a VC General Partner: ${baseUrl}/case-studies/vc-meeting-prep
- Our own ops stack, AI-automated — Avant's internal AI-powered CRM and workflow stack: ${baseUrl}/case-studies/internal-crm-workflow-automation

## Blog
${blogLines}

## Location
Based in London, Ontario, Canada. Serving Canadian PE, VC, and family offices nationwide.

## Contact
Book an intro call: ${baseUrl}/contact
`;

    return new Response(content, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
