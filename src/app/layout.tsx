'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, Sidebar, SidebarRail, SidebarInset } from "@/components/ui/sidebar";
import SidebarContentWrapper from "@/components/SidebarContent";
import { Provider } from 'react-redux';
import { store } from '@/store/store';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen`}
      >
        <Provider store={store}>
          <SidebarProvider defaultOpen={true}>
            <Sidebar variant="sidebar" collapsible="icon">
              <SidebarContentWrapper />
            </Sidebar>

            <SidebarRail/>

            <SidebarInset>
              {children}
            </SidebarInset>
          </SidebarProvider>
        </Provider>
      </body>
    </html>
  );
}
