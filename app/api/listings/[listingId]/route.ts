import db from '@/app/api/db';
import createHttpError from 'http-errors';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

export async function DELETE(request: Request, { params }: { params: Params }) {
  const session = await getAuthSession();

  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new createHttpError.BadRequest('This listing id is not valid');
  }

  const listing = await db.listing.deleteMany({
    where: {
      id: listingId,
      userId: session.user.id,
    },
  });

  return NextResponse.json(listing);
}
