import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Childcare Dashboard',
  description: 'Occupancy, AI and Finance Insights',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-blue-600 min-h-screen">{children}</body>
    </html>
  );
}
