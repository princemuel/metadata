type AuthFormData = Pick<DeepRequired<IUser>, 'name' | 'email' | 'password'>;

interface SafeUser extends IUser {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}
interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  favoriteIds: string[];
}

interface SafeReservation extends IReservation {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
}
interface IReservation {
  id: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  total: number;
  listingId: string;
  userId: string;
}

interface SafeListing extends IListing {
  createdAt: string;
}
interface IListing {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  rooms: number;
  bathrooms: number;
  guests: number;
  location: string;
  userId: string;
}
