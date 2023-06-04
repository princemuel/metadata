'use client';

import { categories, client, getErrorMessage, useLoginModal } from '@/lib';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Range } from 'react-date-range';
import toast from 'react-hot-toast';
import { Container } from '../atoms';
import { ListingHead, ListingInfo, ListingReservation } from '../molecules';

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface Props {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  user?: SafeUser | null;
}

const ListingsTemplate = ({ listing, reservations = [], user }: Props) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    // let dates: Date[] = [];

    // const dates = reservations.reduce((total, reservation) => {
    //   const range = eachDayOfInterval({
    //     start: new Date(reservation.startDate),
    //     end: new Date(reservation.endDate),
    //   });

    //   total = [...total, ...range];
    //   return total;
    // }, [] as Date[]);

    const dates = reservations.flatMap((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      return range;
    });

    // reservations.forEach((reservation) => {
    //   const range = eachDayOfInterval({
    //     start: new Date(reservation.startDate),
    //     end: new Date(reservation.endDate),
    //   });

    //   dates = [...dates, ...range];
    // });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

  const handleCreateReservation = useCallback(() => {
    if (!user) return loginModal.open();
    setIsLoading(true);

    client
      .post('/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success('Your listing is reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch((error) => {
        toast.error(getErrorMessage(error));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    dateRange.endDate,
    dateRange.startDate,
    listing?.id,
    loginModal,
    router,
    totalPrice,
    user,
  ]);

  return (
    <Container>
      <section className='mx-auto max-w-screen-lg'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            image={listing.image}
            location={listing.location}
            id={listing.id}
            user={user}
          />
          <div className='mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              rooms={listing.rooms}
              guests={listing.guests}
              bathrooms={listing.bathrooms}
              location={listing.location}
            />

            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={handleCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export { ListingsTemplate };
