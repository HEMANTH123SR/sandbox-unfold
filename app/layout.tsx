import type { Metadata } from "next";
import "./globals.css";
import { newAgeFont } from "@/fonts/font";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { SandboxLoading } from "@/components/loading";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title:
    "Sandbox – Discover Hackathons, Build Projects, and Connect with Hackers",
  description:
    "Sandbox is India's ultimate hacker community. Explore and participate in top hackathons, showcase projects, find teammates, and connect with mentors. Join over 1000 hackers in building innovative solutions.",
  keywords:
    "Sandbox, hackathons in India, online hackathons, hacker community, project showcase, find teammates, mentoring, innovation challenges, join hackathons, Indian hackers",
  openGraph: {
    title:
      "Sandbox – Discover Hackathons, Build Projects, and Connect with Hackers",
    description:
      "Join Sandbox to participate in top hackathons, showcase your projects, and connect with a thriving hacker community. Discover innovation challenges and build with the best.",
    url: "https://sandbox.in",
    siteName: "Sandbox",
    images: [
      {
        url: "https://sandbox.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sandbox - Hackathon Platform and Hacker Community",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Sandbox",
    title:
      "Sandbox – Discover Hackathons, Build Projects, and Connect with Hackers",
    description:
      "Join India's leading hacker platform, Sandbox, to explore hackathons, showcase projects, and collaborate with a community of innovators.",
    images: [
      {
        url: "https://sandbox.in/twitter-image.png",
        alt: "Sandbox - Hackathon Platform",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          className={`antialiased ${newAgeFont.className} bg-[#FFFEFE] h-full     `}
        >
          <ClerkLoading>
            <SandboxLoading />
          </ClerkLoading>
          <ClerkLoaded>
            <div className="flex w-full h-full mx-auto">{children}</div>
          </ClerkLoaded>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
