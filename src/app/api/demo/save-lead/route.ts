import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, phone, companyName, websiteUrl, industry, companySize, role, painPoints, additionalNotes, brandPrimaryColor, brandLogoUrl } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 },
      );
    }

    if (!industry) {
      return NextResponse.json(
        { error: "Industry is required." },
        { status: 400 },
      );
    }

    // Log the demo lead (same pattern as /api/contact)
    // TODO: Insert into Supabase demo_leads table
    console.log("New demo lead:", {
      name,
      email,
      phone,
      companyName,
      websiteUrl,
      industry,
      companySize,
      role,
      painPoints,
      additionalNotes,
      brandPrimaryColor,
      brandLogoUrl,
      timestamp: new Date().toISOString(),
    });

    // Generate a pseudo-ID for the lead (will be real UUID from Supabase later)
    const leadId = crypto.randomUUID();

    return NextResponse.json(
      { success: true, leadId },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { leadId, tourCompleted, ctaClicked } = body;

    if (!leadId) {
      return NextResponse.json(
        { error: "leadId is required." },
        { status: 400 },
      );
    }

    // TODO: Update the demo_leads record in Supabase
    console.log("Demo lead update:", {
      leadId,
      tourCompleted,
      ctaClicked,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
