'use client';

import {
  DEFAULT_MAP_ATTRIBUTION,
  DEFAULT_MAP_URL,
  useSearchModal,
} from '@/lib';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import React, { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { Heading } from '../atoms';
import { Counter, CountryMenu, DatePicker, Map, Modal } from '../molecules';

enum STEPS {
  LOCATION,
  DATE,
  INFO,
}

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

const SearchForm = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<RentFormData['location']>();
  const [guests, setGueguests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const handleBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const handleNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return handleNext();
    }

    let query = {};

    if (params) {
      query = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...query,
      location: location?.value,
      guests,
      rooms,
      bathrooms,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.close();
    router.push(url);
  }, [
    bathrooms,
    dateRange.endDate,
    dateRange.startDate,
    guests,
    handleNext,
    location?.value,
    params,
    rooms,
    router,
    searchModal,
    step,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return 'Search';
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return;
    return 'Back';
  }, [step]);

  let body = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where do you wanna go?'
        subtitle='Find the perfect location!'
      />
      <CountryMenu
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <hr />

      <Map
        width='800'
        height='400'
        center={location?.latlng || [51, -0.09]}
        zoom={location?.latlng ? 4 : 2}
        scrollWheelZoom={false}
        location={location}
      >
        {({ TileLayer, Marker }) => (
          <React.Fragment>
            <TileLayer
              url={DEFAULT_MAP_URL}
              attribution={DEFAULT_MAP_ATTRIBUTION}
            />
            {location?.latlng && <Marker position={location?.latlng} />}
          </React.Fragment>
        )}
      </Map>
    </div>
  );

  if (step === STEPS.DATE) {
    body = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you plan to go?'
          subtitle='Make sure everyone is free!'
        />
        <DatePicker
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    body = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='More information'
          subtitle='Find your perfect place!'
        />
        <Counter
          update={(value) => setGueguests(value)}
          value={guests}
          title='Guests'
          subtitle='How many guests are coming?'
        />
        <hr />

        <Counter
          update={(value) => setRooms(value)}
          value={rooms}
          title='Rooms'
          subtitle='How many rooms do you need?'
        />
        <hr />

        <Counter
          update={(value) => setBathrooms(value)}
          value={bathrooms}
          title='Bathrooms'
          subtitle='How many bahtrooms do you need?'
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.show}
      title='Filters'
      actionLabel={actionLabel}
      onSubmit={handleSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : handleBack}
      onClose={searchModal.close}
      body={body}
    />
  );
};

export { SearchForm };
