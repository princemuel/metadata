import { getCurrentUser } from '@/app/actions';
import { NextResponse } from 'next/server';
import { db } from '../../auth/[...nextauth]/route';

export async function DELETE(request: Request, { params }: { params: Params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.error();

  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new TypeError('This listing id is not valid');
  }

  const listing = await db.listing.deleteMany({
    where: {
      id: listingId,
      userId: user.id,
    },
  });

  return NextResponse.json(listing);
}
