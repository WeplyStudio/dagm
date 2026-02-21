
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DAGM - Dewan Aspirasi Generasi Muda',
  description: 'Institusi formal representasi pemuda untuk advokasi dan perumusan rekomendasi kebijakan strategis.',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-white text-[#121212]">{children}</body>
    </html>
  );
}
