import { getErrorMessage } from '@/lib';
import { db } from '../api/auth/[...nextauth]/route';
import { getCurrentUser } from './get-current-user';

export async function getFavoriteListings() {
  try {
    const user = await getCurrentUser();
    if (!user) return [];

    const favorites = await db.listing.findMany({
      where: {
        id: {
          in: [...(user.favoriteIds || [])],
        },
      },
    });

    return favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
