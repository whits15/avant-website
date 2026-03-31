import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page Not Found",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
            <div>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
                <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.7 }}>This page could not be found.</p>
                <a href="/" className="btn btn--primary">Back to Home</a>
            </div>
        </div>
    );
}
