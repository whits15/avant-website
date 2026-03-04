import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { name, email, phone, company, employees, message } = body;

        // Basic validation
        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required." },
                { status: 400 }
            );
        }

        // Email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format." },
                { status: 400 }
            );
        }

        // For now, log the submission. Once Supabase is connected,
        // this will insert into the contact_submissions table.
        console.log("New contact submission:", {
            name,
            email,
            phone,
            company,
            employees,
            message,
            timestamp: new Date().toISOString(),
        });

        // TODO: Insert into Supabase
        // const { error } = await supabase
        //   .from("contact_submissions")
        //   .insert({ name, email, phone, company, employee_count: employees, message });

        // TODO: Send email notification
        // await sendEmail({ to: "hello@avant.ca", subject: `New lead: ${company}`, ... });

        return NextResponse.json(
            { success: true, message: "Thank you! We'll be in touch within 24 hours." },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}
