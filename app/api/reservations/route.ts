import { getCurrentUser } from '@/app/actions';
import db from '@/app/api/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.error();

  const body = (await request.json()) as IReservation;
  const { listingId, startDate, endDate, total } = body;

  if (!listingId || !startDate || !endDate || !total) {
    return NextResponse.error();
  }

  const data = await db.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: user.id,
          startDate,
          endDate,
          total,
        },
      },
    },
  });

  return NextResponse.json(data);
}
