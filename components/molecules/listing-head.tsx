"use client";

import { useCountries } from "@/lib";
import Image from "next/image";
import { Heading, HeartButton } from "../atoms";

interface Props {
  id: string;
  title: string;
  location: string;
  image: string;
  user?: SafeUser | null;
}

const ListingHead = ({ title, location, image, id, user }: Props) => {
  const [_, fetchByCode] = useCountries();
  const country = fetchByCode(location);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${country?.region}, ${country?.name}`}
      />
      <figure className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image src={image} fill className="w-full object-cover" alt="Image" />
        <div className="absolute right-5 top-5">
          <HeartButton listing={id} user={user} />
        </div>
      </figure>
    </>
  );
};

export { ListingHead };
