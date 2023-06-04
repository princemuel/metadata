import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { client } from '../clients';
import { getErrorMessage } from '../helpers';
import { useLoginModal } from './use-modals';

const useFavorite = (listing: string, user?: SafeUser | null) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const isFavorite = useMemo(() => {
    const list = user?.favoriteIds || [];
    return list.includes(listing);
  }, [user, listing]);

  const toggle = useCallback(
    async (e: ReactMouseEvent) => {
      e.stopPropagation();
      if (!user) return loginModal.open();

      try {
        let request: () => Promise<AxiosResponse<any, any>>;
        if (isFavorite) {
          request = () => client.delete(`/favorites/${listing}`);
        } else {
          request = () => client.post(`/favorites/${listing}`);
        }
        await request();
        router.refresh();
        toast.success('Success');
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [user, isFavorite, listing, loginModal, router]
  );

  return [isFavorite, toggle] as const;
};

export default useFavorite;
