'use client';

import { client, getErrorMessage } from '@/lib';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Container, Heading } from '../atoms';
import { ListingCard } from '../molecules';

interface Props {
  reservations: SafeReservation[];
  user?: SafeUser | null;
}

const TripsTemplate = ({ reservations, user }: Props) => {
  const router = useRouter();
  const [idToDelete, setIdToDelete] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setIdToDelete(id);

      client
        .delete(`/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled successfully');
          router.refresh();
        })
        .catch((error) => {
          toast.error(getErrorMessage(error));
        })
        .finally(() => {
          setIdToDelete('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title='Trips'
        subtitle="Where you've been and where you're going"
      />
      <ul className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={idToDelete === reservation.id}
            actionLabel='Cancel reservation'
            user={user}
          />
        ))}
      </ul>
    </Container>
  );
};

export { TripsTemplate };
