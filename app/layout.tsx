import { ClientOnly, Navbar } from '@/components';
import { Providers } from '@/lib/providers';
import { Metadata } from 'next';
import * as React from 'react';
import { getCurrentUser } from './actions/get-current-user';
import { font } from './fonts';
import './globals.css';

// pnpm dlx create-next-app@latest --use-pnpm

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html
      lang='en'
      className={font}
    >
      <body>
        <React.Fragment>
          <ClientOnly>
            <Providers />
          </ClientOnly>
          <Navbar currentUser={user} />
          <main className='pb-20 pt-28'>{children}</main>
        </React.Fragment>
      </body>
    </html>
  );
}
