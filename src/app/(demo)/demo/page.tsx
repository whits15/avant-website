import type { Metadata } from "next";
import DemoPage from "@/components/demo/DemoPage";

export const metadata: Metadata = {
  title: "See Your Custom CRM | Avant",
  description:
    "Enter your website and see a fully customized CRM demo tailored to your business in seconds. Experience what Avant can build for you.",
  alternates: { canonical: "/demo" },
};

export default function Page() {
  return <DemoPage />;
}
