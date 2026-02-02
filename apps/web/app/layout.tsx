import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BUKHARAREST.UZ',
  description: 'Modern restoran, bron va yetkazib berish tizimi.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
