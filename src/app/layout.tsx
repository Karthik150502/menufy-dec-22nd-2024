import type { Metadata } from "next";
import "./globals.css";
import { montserrat400 } from "./fonts/custom/montserrat";
import NextTopLoader from "nextjs-toploader"
import { ThemeProvider } from "@/providers/themeProvider";
import NextAuthSessisonProvider from "@/providers/nextAuthSessisonProvider";
import { getSession } from "@/auth/getSession";
import QueryProvider from "@/providers/queryClient";
import RecoilProvider from "@/providers/recoilProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Menufy",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body
        className={`${montserrat400.className} min-h-screen relative overflow-hidden antialiased`}
      >
        <RecoilProvider>
          <QueryProvider>
            <NextAuthSessisonProvider session={session}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <NextTopLoader color='#961D96' showSpinner={false} />
                {children}
                <Toaster />
              </ThemeProvider>
            </NextAuthSessisonProvider>
          </QueryProvider>
        </RecoilProvider>
      </body>
    </html >
  );
}
