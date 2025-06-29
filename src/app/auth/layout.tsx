import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Sign in to your account',};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4`}>
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
