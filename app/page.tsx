import { ClientOnly, Container, EmptyState, ListingCard } from '@/components';
import { getCurrentUser, getListings } from './actions';

interface HomeProps {
  searchParams: Params;
}

const Page = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const user = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <Container>
      <ClientOnly>
        <ul className='grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {listings.map((listing) => (
            <ListingCard
              user={user}
              key={listing.id}
              data={listing}
            />
          ))}
        </ul>
      </ClientOnly>
    </Container>
  );
};

export default Page;
