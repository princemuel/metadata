type AuthFormData = Pick<DeepRequired<IUser>, 'name' | 'email' | 'password'>;

interface RentFormData extends Omit<IListing, 'id' | 'createdAt' | 'userId'> {
  location?: ICountry | null;
}

interface Params {
  [key: string]: string | undefined;
}

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
  endDate: string;
  startDate: string;
  listing: SafeListing;
}
interface IReservation {
  id: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  listingId: string;
  total: number;
  userId: string;
}

interface SafeListing extends IListing {
  createdAt: string;
}
interface IListing {
  id: string;
  createdAt: Date;
  bathrooms: number;
  category: string;
  description: string;
  guests: number;
  image: string;
  location: string;
  price: number;
  rooms: number;
  title: string;
  userId: string;
}

interface ICountry {
  value: any;
  code: string;
  name: string;
  flag: string;
  latlng: [number, number];
  region: string;
}
