import '../globals.css'
import type { Metadata } from 'next'
import {Providers} from "@/app/store/Providers";
import Header from "@/app/components/Header";
import React from "react";

export const metadata: Metadata = {
  title: 'Summer Shop',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
    <Providers>
      {
        <header>
          <Header/>
        </header>
      }
      {children}
    </Providers>
    </body>
    </html>
  )
}
