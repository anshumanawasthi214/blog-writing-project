import "./globals.css";
import { Providers } from "../components/providers";
import Navbar from "../components/navbar";

export const metadata = {
  title: "Blog Website",
  description: "Modern blog frontend with Next.js and shadcn-style UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased transition-colors dark:bg-zinc-950 dark:text-zinc-100">
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
