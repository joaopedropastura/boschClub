import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ThemeSwitcher from "@/components/common/theme-switcher/theme-switcher";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"


export const metadata: Metadata = {
  title: "clube bosch",
  description: "Generated by João Pedro and Iago Souza",
};

const font = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("", font.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>

      </body>
    </html>
  );
}
