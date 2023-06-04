'use client';

import { useCountries } from '@/lib';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Button, HeartButton } from '../atoms';

interface Props {
  data: SafeListing;
  reservation?: SafeReservation;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  user?: SafeUser | null;
  onAction?: (id: string) => void;
}

const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  user,
}: Props) => {
  const router = useRouter();
  const [_, fetchByCode] = useCountries();

  const location = fetchByCode(data.location);

  const handleCancel = useCallback(
    (event: ReactMouseEvent) => {
      event.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.total;
    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <li className='group col-span-1 cursor-pointer'>
      <div
        role='button'
        className='flex w-full flex-col gap-2'
        onClick={() => router.push(`/listings/${data.id}`)}
        onKeyDown={() => router.push(`/listings/${data.id}`)}
      >
        <figure className='relative aspect-square w-full overflow-hidden rounded-xl'>
          <Image
            fill
            className='h-full w-full object-cover transition group-hover:scale-110'
            src={data.image}
            alt='Listing'
          />
          <div className='absolute right-3 top-3'>
            <HeartButton
              listing={data.id}
              user={user}
            />
          </div>
        </figure>

        <h4 className='text-lg font-semibold'>
          {location?.region}, {location?.name}
        </h4>

        <p className='font-light text-neutral-500'>
          {reservationDate || data.category}
        </p>

        <p className='flex items-center gap-1'>
          <span className='font-semibold'>${price}</span>{' '}
          {!reservation && <span className='font-light'>per night</span>}
        </p>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </li>
  );
};

export { ListingCard };
