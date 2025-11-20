import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import TopBar from '@/components/layout/TopBar';
import BottomBar from '@/components/layout/BottomBar';

export const metadata: Metadata = {
  title: 'Axiom Pulse Clone',
  description: 'Token discovery table – clone of Axiom Trade Pulse'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-slate-100 antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <TopBar />
            {/* main content area */}
            <div className="flex-1 pt-3 pb-10">
              {children}
            </div>
            <BottomBar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
