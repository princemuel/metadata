import { ClientOnly, Navbar, RegisterForm } from '@/components';
import { LoginForm } from '@/components/organisms/login';
import { ToastProvider } from '@/lib';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import * as React from 'react';
import getCurrentUser from './actions/get-current-user';
import './globals.css';

const font = Nunito({ subsets: ['latin'] });

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
    <html lang='en'>
      <body className={font.className}>
        <React.Fragment>
          <ClientOnly>
            <ToastProvider />
            <LoginForm />
            <RegisterForm />
          </ClientOnly>
          <Navbar currentUser={user} />
          {children}
        </React.Fragment>
      </body>
    </html>
  );
}
