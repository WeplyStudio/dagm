
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DAGM - Dewan Aspirasi Generasi Muda',
  description: 'Wadah resmi pelajar untuk berdialektika dan merumuskan kebijakan pendidikan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
