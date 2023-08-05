import db from '@/app/api/db';
import createHttpError from 'http-errors';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

export async function POST(_request: Request, { params }: { params: Params }) {
  const session = await getAuthSession();

  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new createHttpError.BadRequest('This listing id is not valid');
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const favorites = [...(user?.favorites || []), listingId];

  const data = await db.user.update({
    data: {
      favorites,
    },
    where: {
      id: session.user.id,
    },
  });

  return NextResponse.json(data);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Params }
) {
  const session = await getAuthSession();

  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new createHttpError.BadRequest('This listing id is not valid');
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const favorites = [...(user?.favorites || [])].filter(
    (favorite) => listingId !== favorite
  );

  const data = await db.user.update({
    data: {
      favorites,
    },
    where: {
      id: session.user.id,
    },
  });

  return NextResponse.json(data);
}
