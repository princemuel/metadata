import { getServerSession } from 'next-auth/next';
import { authOptions, db } from '../api/auth/[...nextauth]/route';

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;

    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!user) return null;

    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    return null;
  }
}
