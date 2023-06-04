import { ClientOnly, EmptyState, FavoritesTemplate } from '@/components';
import { getCurrentUser, getFavoriteListings } from '../actions';

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <ClientOnly>
        <EmptyState
          title='Unauthorized'
          subtitle='Please login'
        />
      </ClientOnly>
    );
  }

  const listings = await getFavoriteListings();
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No favorites found'
          subtitle='Looks like you have no favorite listings.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesTemplate
        listings={listings}
        user={user}
      />
    </ClientOnly>
  );
};

export default Page;
