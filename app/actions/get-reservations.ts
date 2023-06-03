import { getErrorMessage } from '@/lib';
import { db } from '../api/auth/[...nextauth]/route';

export async function getReservations(params: Params) {
  try {
    const { listingId, userId, authorId } = params;

    const query: Record<string, string | {}> = {};

    if (listingId) query.listingId = listingId;
    if (userId) query.userId = userId;
    if (authorId) query.listing = { userId: authorId };

    const reservations = await db.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const data = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
