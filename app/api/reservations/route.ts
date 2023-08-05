import db from '@/app/api/db';
import { objectKeys } from '@/lib';
import createHttpError from 'http-errors';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../auth/[...nextauth]/options';

export async function POST(request: Request) {
  const session = await getAuthSession();

  const body = await request.json();

  for (const value of objectKeys(body)) {
    if (body[value] == undefined) {
      throw new createHttpError.BadRequest(
        `Malformed data received. Got ${body[value]}`
      );
    }
  }

  const data = await db.listing.update({
    data: {
      reservations: {
        create: {
          start: body.start,
          end: body.end,
          total: body.total,
          userId: session.user.id,
        },
      },
    },
    where: {
      id: body.listingId,
    },
  });

  return NextResponse.json(data);
}
