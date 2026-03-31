export function GET() {
    const content = `# Avant — AI Implementation for Ontario Businesses

> Avant helps Ontario small and medium businesses move from AI curiosity to measurable operational results through workshops, implementation sprints, and fractional AI officer support. Real ROI. No hype.

## Services
- AI Opportunity Assessment (free): 30–45 minute diagnostic with AI Opportunity Summary
- AI Quick-Win Workshop ($500/person): 4-hour hands-on session with working AI tools
- AI Implementation Sprints ($2,500–$3,500): 2–4 week focused engagements with 30-day ROI scorecard
- Monthly AI Retainer ($3,000–$5,000): Fractional Chief AI Officer support

## Pages
- Homepage: https://www.avantai.ca
- Services: https://www.avantai.ca/services
- About: https://www.avantai.ca/about
- Blog: https://www.avantai.ca/blog
- Case Studies: https://www.avantai.ca/case-studies
- Contact: https://www.avantai.ca/contact

## Blog
- AI Usage on the Books: https://www.avantai.ca/blog/ai-usage-on-the-books
- Brain Dump: https://www.avantai.ca/blog/brain-dump
- Low Hanging Fruit AI Tools: https://www.avantai.ca/blog/the-low-hanging-fruit-ai-tools-worth-your-time-right-now

## Location
Ontario, Canada
`;

    return new Response(content, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
