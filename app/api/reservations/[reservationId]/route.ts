import db from '@/app/api/db';
import createHttpError from 'http-errors';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

export async function DELETE(
  _request: Request,
  { params }: { params: Params }
) {
  const session = await getAuthSession();

  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== 'string') {
    throw new createHttpError.BadRequest('This reservation id is not valid');
  }

  const data = await db.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: session.user.id },
        { listing: { userId: session.user.id } },
      ],
    },
  });

  return NextResponse.json(data);
}
