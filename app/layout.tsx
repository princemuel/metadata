import { ClientOnly, Navbar, RegisterForm } from '@/components';
import { ToastProvider } from '@/lib';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import * as React from 'react';
import './globals.css';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
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
          <ClientOnly>
            <ToastProvider />
            <RegisterForm />
          </ClientOnly>
          <Navbar />
          {children}
        </React.Fragment>
      </body>
    </html>
  );
}
