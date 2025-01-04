import { Metadata } from "next";
import React, { Suspense } from "react";
import "@styles/global.css";
import AppLayout from "@/app/_components/app-layout/app-layout";

export const metadata: Metadata = {
  title: "Asistente CRM",
  description: "Esto es una prueba de la app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
