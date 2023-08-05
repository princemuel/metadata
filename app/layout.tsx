import { SessionProvider } from '@/providers';
import { Providers } from '@/providers/providers';
import { Metadata } from 'next';
import * as React from 'react';
import { getAuthSession } from './api/auth/[...nextauth]/options';
import { font } from './fonts';
import './globals.css';

// pnpm dlx create-next-app@latest --use-pnpm

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getAuthSession().then((response) => response);
  return (
    <html
      lang='en'
      className={font}
    >
      <body>
        <SessionProvider session={session}>
          <Providers>
            {/* <Navbar currentUser={user} /> */}
            <main className='pb-20 pt-28'>{children}</main>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
