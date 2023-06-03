import { ClientOnly, Navbar } from "@/components";
import { Providers } from "@/lib/providers";
import { Metadata } from "next";
import { Nunito } from "next/font/google";
import * as React from "react";
import getCurrentUser from "./actions/get-current-user";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <React.Fragment>
          <ClientOnly>
            <Providers />
          </ClientOnly>

          <Navbar currentUser={user} />

          <React.Fragment>{children}</React.Fragment>
        </React.Fragment>
      </body>
    </html>
  );
}
