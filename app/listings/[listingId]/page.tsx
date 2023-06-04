import { ClientOnly, EmptyState, ListingsTemplate } from '@/components';
import { getCurrentUser, getListingById, getReservations } from '../../actions';

const Page = async ({ params }: { params: Params }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const user = await getCurrentUser();

  return (
    <ClientOnly>
      {listing ? (
        <ListingsTemplate
          listing={listing}
          reservations={reservations}
          user={user}
        />
      ) : (
        <EmptyState />
      )}
    </ClientOnly>
  );
};

export default Page;
