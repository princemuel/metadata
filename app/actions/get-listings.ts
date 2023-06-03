import { getErrorMessage } from '@/lib';
import { db } from '../api/auth/[...nextauth]/route';

export async function getListings(params: Params) {
  try {
    const {
      userId,
      rooms,
      guests,
      bathrooms,
      location,
      startDate,
      endDate,
      category,
    } = params;

    const query: Record<string, string | {}> = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (rooms) {
      query.rooms = {
        gte: +rooms,
      };
    }

    if (guests) {
      query.guests = {
        gte: +guests,
      };
    }

    if (bathrooms) {
      query.bathrooms = {
        gte: +bathrooms,
      };
    }

    if (location) {
      query.location = location;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await db.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
