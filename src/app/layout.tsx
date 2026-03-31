import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ChatProvider } from "@/features/chat/lib/chat-store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Tamerlan's Portfolio",
  description:
    "Welcome to my portfolio website! I'm Tamerlan, a passionate full-stack developer with a love for creating innovative web applications. Explore my projects, skills, and experience to see how I can bring value to your next project.",
  keywords: [
    "Tamerlan",
    "portfolio",
    "full-stack developer",
    "web developer",
    "projects",
    "skills",
    "experience",
    "JavaScript",
    "React",
    "Node.js",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Tamerlan Kangarli", url: "https://tamerlan.dev" }],
  creator: "Tamerlan Kangarli",
  openGraph: {
    title: "Tamerlan's Portfolio",
    description:
      "Welcome to my portfolio website! I'm Tamerlan, a passionate full-stack developer with a love for creating innovative web applications. Explore my projects, skills, and experience to see how I can bring value to your next project.",
    url: "https://tamerlan.dev",
    siteName: "Tamerlan's Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("min-h-screen h-full antialiased", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}
