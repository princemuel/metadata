'use client';

import {
  DEFAULT_MAP_ATTRIBUTION,
  DEFAULT_MAP_HEIGHT,
  DEFAULT_MAP_URL,
  DEFAULT_MAP_WIDTH,
  useCountries,
} from '@/lib';
import dynamic from 'next/dynamic';
import React from 'react';
import { IconType } from 'react-icons';
import { Avatar } from '../atoms';
import { ListingCategory } from './listing-category';

interface Props {
  user: SafeUser;
  description: string;
  guests: number;
  rooms: number;
  bathrooms: number;
  category?: {
    icon: IconType;
    label: string;
    description: string;
  };

  location: string;
}

const Map = dynamic(() => import('../atoms/base-map'), {
  ssr: false,
});

const ListingInfo = ({
  user,
  description,
  guests,
  rooms,
  bathrooms,
  category,
  location,
}: Props) => {
  const [_, fetchByCode] = useCountries();
  const coordinates = fetchByCode(location)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <header className='flex flex-col gap-2'>
        <div className='flex items-center gap-2 text-xl font-semibold'>
          <h4>Hosted by {user?.name}</h4>
          <Avatar src={user?.image} />
        </div>

        <p className='flex items-center gap-4 font-light text-neutral-500'>
          <span>{guests} guests</span>
          <span>{rooms} rooms</span>
          <span>{bathrooms} bathrooms</span>
        </p>
      </header>

      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}

      <hr />

      <p className='text-lg font-light text-neutral-500'>{description}</p>

      <hr />

      <section
        style={{
          aspectRatio: Number(DEFAULT_MAP_WIDTH) / Number(DEFAULT_MAP_HEIGHT),
        }}
      >
        <Map
          center={coordinates || [51, -0.09]}
          zoom={coordinates ? 4 : 2}
          scrollWheelZoom={false}
        >
          {({ TileLayer, Marker }) => (
            <React.Fragment>
              <TileLayer
                url={DEFAULT_MAP_URL}
                attribution={DEFAULT_MAP_ATTRIBUTION}
              />
              {coordinates ? <Marker position={coordinates} /> : null}
            </React.Fragment>
          )}
        </Map>
      </section>
    </div>
  );
};

export { ListingInfo };
