import { Container, Heading } from '../atoms';
import { ListingCard } from '../molecules';

interface Props {
  listings: SafeListing[];
  user?: SafeUser | null;
}

const FavoritesTemplate = ({ listings, user }: Props) => {
  return (
    <Container>
      <Heading
        title='Favorites'
        subtitle='List of places you liked'
      />
      <ul className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {listings.map((listing) => (
          <ListingCard
            user={user}
            key={listing.id}
            data={listing}
          />
        ))}
      </ul>
    </Container>
  );
};

export { FavoritesTemplate };
