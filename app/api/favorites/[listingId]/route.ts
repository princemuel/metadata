import { getCurrentUser } from '@/app/actions';
import { NextResponse } from 'next/server';
import { db } from '../../auth/[...nextauth]/route';

export async function POST(request: Request, { params }: { params: Params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.error();

  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new TypeError('This listing id is not valid');
  }

  const favoriteIds = [...(user.favoriteIds || []), listingId];

  const data = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.error();

  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new TypeError('This listing id is not valid');
  }

  const favoriteIds = [...(user.favoriteIds || [])].filter((id) => {
    return id !== listingId;
  });

  const data = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(data);
}
