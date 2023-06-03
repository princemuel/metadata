import getCurrentUser from "@/app/actions/get-current-user";
import { NextResponse } from "next/server";
import { db } from "../../auth/[...nextauth]/route";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.error();

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new TypeError("This listing id is invalid");
  }

  const listing = await db.listing.deleteMany({
    where: {
      id: listingId,
      userId: user.id,
    },
  });

  return NextResponse.json(listing);
}
