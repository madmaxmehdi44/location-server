// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Location Tracker',
  description: 'ثبت‌نام و ورود کاربران',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <body className={inter.className}>
        <main style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
          {children}
        </main>
      </body>
    </html>
  );
}