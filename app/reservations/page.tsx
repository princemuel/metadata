import { ClientOnly, EmptyState, ReservationsTemplate } from '@/components';
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

  const reservations = await getReservations({ authorId: user.id });
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No reservations found'
          subtitle='Looks like you have no reservations on your properties.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsTemplate
        reservations={reservations}
        user={user}
      />
    </ClientOnly>
  );
};

export default Page;
