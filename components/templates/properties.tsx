'use client';

import { client } from '@/lib';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Container, Heading } from '../atoms';
import { ListingCard } from '../molecules';

interface Props {
  listings: SafeListing[];
  user?: SafeUser | null;
}

const PropertiesTemplate = ({ listings, user }: Props) => {
  const router = useRouter();
  const [idToDelete, setIdToDelete] = useState('');

  const handleDelete = useCallback(
    (id: string) => {
      setIdToDelete(id);

      client
        .delete(`/listings/${id}`)
        .then(() => {
          toast.success('Listing deleted successfully');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
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
        title='Properties'
        subtitle='List of your properties'
      />

      <ul className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={handleDelete}
            disabled={idToDelete === listing.id}
            actionLabel='Delete property'
            user={user}
          />
        ))}
      </ul>
    </Container>
  );
};

export { PropertiesTemplate };
