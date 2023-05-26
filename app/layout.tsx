import { Navbar } from '@/components';
import { Nunito } from 'next/font/google';
import * as React from 'react';
import './globals.css';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <React.Fragment>
          <Navbar />
          {children}
        </React.Fragment>
      </body>
    </html>
  );
}
