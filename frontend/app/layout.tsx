import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wepunt — Funded Sports Prop Firm",
  description: "Buy a challenge, place mock bets, hit the target, get funded. Keep 40% of profits.",
  keywords: "sports betting, prop firm, funded account, challenge, wepunt",
  openGraph: {
    title: "Wepunt — Funded Sports Prop Firm",
    description: "Complete the challenge. Unlock your funded account. Keep 40% of profits.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#06080F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100dvh", position: "relative" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
