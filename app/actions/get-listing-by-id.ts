import { getErrorMessage } from '@/lib';
import { db } from '../api/auth/[...nextauth]/route';

export async function getListingById(params: Params) {
  try {
    const { listingId } = params;

    const listing = await db.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });
    if (!listing) return null;

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
