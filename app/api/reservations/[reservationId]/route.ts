import { getCurrentUser } from '@/app/actions';
import db from '@/app/api/db';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, { params }: { params: Params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.error();

  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== 'string') {
    throw new TypeError('This reservation id is not valid');
  }

  const data = await db.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: user.id }, { listing: { userId: user.id } }],
    },
  });

  return NextResponse.json(data);
}
