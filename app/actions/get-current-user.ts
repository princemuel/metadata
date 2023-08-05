import { getAuthSession } from '../api/auth/[...nextauth]/options';
import db from '../api/db';

export async function fetchUser() {
  try {
    const session = await getAuthSession();
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
