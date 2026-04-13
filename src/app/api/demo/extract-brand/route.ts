import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { generateColorSet } from "@/lib/demo/brandUtils";

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL is required." },
        { status: 400 },
      );
    }

    // Normalise URL
    let normalised = url.trim();
    if (!/^https?:\/\//i.test(normalised)) {
      normalised = "https://" + normalised;
    }

    let parsed: URL;
    try {
      parsed = new URL(normalised);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format." },
        { status: 400 },
      );
    }

    // Fetch the page HTML
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    let html: string;
    try {
      const res = await fetch(parsed.toString(), {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; AvantBot/1.0; +https://avantai.ca)",
          Accept: "text/html",
        },
        redirect: "follow",
      });
      html = await res.text();
    } catch {
      return NextResponse.json({
        success: true,
        data: {
          primaryColor: null,
          secondaryColor: null,
          accentColor: null,
          logoUrl: null,
          companyName: null,
        },
      });
    } finally {
      clearTimeout(timeout);
    }

    // Trim HTML to stay within reasonable token limits (~4K tokens)
    // Keep <head> fully and truncate <body> to first 3000 chars
    const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const headContent = headMatch ? headMatch[0] : "";
    const bodyContent = bodyMatch
      ? bodyMatch[1].slice(0, 3000)
      : html.slice(0, 4000);

    const trimmedHtml = `${headContent}\n<body>\n${bodyContent}\n</body>`;

    // Ask Haiku to extract brand data
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `Analyze this website HTML and extract the brand identity. Return ONLY valid JSON with these fields:

- "primaryColor": the main brand color as a hex string (e.g. "#2C5F8A"). Look at theme-color meta tags, CSS custom properties (--primary, --brand-color, --accent, etc.), frequently used colors in styles, or infer from the overall design.
- "logoUrl": the URL of the company's logo image. PRIORITY ORDER:
  1. FIRST: Look for an <img> tag inside <header>, <nav>, or an element with class/id containing "header" or "nav". This is almost always the real logo.
  2. SECOND: Look for an <img> tag with class/id/alt containing "logo".
  3. THIRD: Look for <link rel="icon"> or <link rel="shortcut icon"> (favicon).
  4. LAST: apple-touch-icon or og:image.
  Return the src/href value exactly as it appears (relative or absolute). Do NOT return og:image unless nothing else is available — it's usually a social preview, not the logo.
- "companyName": the company or brand name. Check og:title, <title> tag, or the alt text of the header logo image. Strip taglines and suffixes like "| Home".

If you cannot confidently determine a field, set it to null. Do NOT guess random colors — only extract colors you can actually see in the HTML.

URL: ${parsed.toString()}

HTML:
${trimmedHtml}`,
        },
      ],
    });

    // Parse Haiku's response
    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({
        success: true,
        data: {
          primaryColor: null,
          secondaryColor: null,
          accentColor: null,
          logoUrl: null,
          companyName: null,
        },
      });
    }

    const extracted = JSON.parse(jsonMatch[0]);

    // Resolve relative logo URLs
    let logoUrl: string | null = null;
    if (extracted.logoUrl) {
      try {
        logoUrl = new URL(extracted.logoUrl, parsed.origin).toString();
      } catch {
        logoUrl = null;
      }
    }

    // Generate color variants from primary
    let colors = {
      primaryColor: null as string | null,
      secondaryColor: null as string | null,
      accentColor: null as string | null,
    };
    if (extracted.primaryColor && /^#[0-9a-fA-F]{3,6}$/.test(extracted.primaryColor)) {
      const set = generateColorSet(extracted.primaryColor);
      colors = {
        primaryColor: set.primaryColor,
        secondaryColor: set.secondaryColor,
        accentColor: set.accentColor,
      };
    }

    return NextResponse.json({
      success: true,
      data: {
        ...colors,
        logoUrl,
        companyName: extracted.companyName || null,
      },
    });
  } catch (err) {
    console.error("Brand extraction error:", err);
    // Non-fatal — return empty data, demo will use industry defaults
    return NextResponse.json({
      success: true,
      data: {
        primaryColor: null,
        secondaryColor: null,
        accentColor: null,
        logoUrl: null,
        companyName: null,
      },
    });
  }
}
