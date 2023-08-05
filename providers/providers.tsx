import * as React from 'react';
import { ModalsProvider } from './modals';
import { ToastProvider } from './toast';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <>
      <ToastProvider />
      <ModalsProvider />
      {children}
    </>
  );
};

export { Providers };
