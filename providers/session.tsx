'use client';

import type { Session } from 'next-auth';
import { createContext, useContext } from 'react';

const SessionContext = createContext<Promise<Session> | null>(null);

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Promise<Session>;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const session = useContext(SessionContext);
  if (session == null)
    throw new Error('useSession must be used within a SessionProvider');

  return session;
}
