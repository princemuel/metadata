import db from '@/app/api/db';
import { objectKeys } from '@/lib';
import createHttpError from 'http-errors';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../auth/[...nextauth]/options';

export async function POST(request: Request) {
  const session = await getAuthSession();

  const body = (await request.json()) as IListing;

  for (const value of objectKeys(body)) {
    if (body[value] == undefined) {
      throw new createHttpError.BadRequest(
        `Malformed data received. Got ${body[value]}`
      );
    }
  }
  // const {
  //   title,
  //   description,
  //   image,
  //   category,
  //   rooms,
  //   bathrooms,
  //   guests,
  //   location,
  //   price,
  // } = body;

  const listing = await db.listing.create({
    data: {
      ...body,
      // @ts-expect-error // fix this type issue later
      location: location.code,
      // check this later
      price: Number.parseInt(body.price.toString(), 10),
      userId: session.user.id,
    },
  });

  return NextResponse.json(listing);
}
