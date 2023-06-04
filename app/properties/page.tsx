import { ClientOnly, EmptyState, PropertiesTemplate } from '@/components';
import { getCurrentUser, getListings } from '../actions';

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <EmptyState
        title='Unauthorized'
        subtitle='Please login'
      />
    );
  }

  const listings = await getListings({ userId: user.id });
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No properties found'
          subtitle='Looks like you have no properties.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesTemplate
        listings={listings}
        user={user}
      />
    </ClientOnly>
  );
};

export default Page;
