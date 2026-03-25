import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WePunt — Funded Sports Trading",
  description: "Complete the challenge. Unlock funded capital. Keep 40% of profits.",
  keywords: "prop firm, sports betting, funded account, challenge, wepunt",
};
export const viewport: Viewport = {
  themeColor: "#080C14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100dvh", position: "relative", overflowX: "hidden", background: "var(--bg)" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
