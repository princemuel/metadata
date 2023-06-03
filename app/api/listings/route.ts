import { getCurrentUser } from '@/app/actions';
import { objectKeys } from '@/lib';
import { NextResponse } from 'next/server';
import { db } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.error();

  const body = (await request.json()) as IListing;
  const {
    title,
    description,
    image,
    category,
    rooms,
    bathrooms,
    guests,
    location,
    price,
  } = body;

  for (const value of objectKeys(body)) {
    if (!body[value]) return NextResponse.error();
  }

  const listing = await db.listing.create({
    data: {
      title,
      description,
      image,
      category,
      rooms,
      bathrooms,
      guests,
      // @ts-expect-error // fix this type issue later
      location: location.code,
      price: Number.parseInt(price.toString(), 10),
      userId: user.id,
    },
  });

  return NextResponse.json(listing);
}
