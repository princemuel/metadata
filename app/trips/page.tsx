import { ClientOnly, EmptyState, TripsTemplate } from '@/components';
import { getCurrentUser, getReservations } from '../actions';

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

  const reservations = await getReservations({ userId: user.id });
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No trips found'
          subtitle='Looks like you havent reserved any trips.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsTemplate
        reservations={reservations}
        user={user}
      />
    </ClientOnly>
  );
};

export default Page;
