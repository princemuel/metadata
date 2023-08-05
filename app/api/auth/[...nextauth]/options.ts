import db from '@/app/api/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import createHttpError from 'http-errors';
import {
  Session,
  getServerSession,
  type NextAuthOptions,
  type TokenSet,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const GITHUB_ID = process.env.GITHUB_ID || '';
const GITHUB_SECRET = process.env.GITHUB_SECRET || '';
const GOOGLE_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
          response_type: 'code',
        },
      },
    }),

    // deprecate this provider later
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new TypeError(
            'Invalid Credentials: Email and password are required'
          );

        const user = await db.user.findUnique({
          where: {
            email: credentials.email.toLowerCase(),
          },
        });
        if (!user || !user?.password)
          throw new ReferenceError(
            'Invalid Credentials: This user does not exist'
          );

        const matches = await compare(credentials.password, user.password);
        if (!matches) {
          throw new TypeError(
            'Invalid Credentials: Please enter a valid password'
          );
        }

        return user;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],

  callbacks: {
    async session({ session, user }) {
      const [google] = await db.account.findMany({
        where: { userId: user.id, provider: 'google' },
      });

      if (google?.expires_at && google?.expires_at * 1000 < Date.now()) {
        // If the access token has expired, try to refresh it
        try {
          const response = await fetch('https://oauth2.googleapis.com/token', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: GOOGLE_ID,
              client_secret: GOOGLE_SECRET,
              grant_type: 'refresh_token',
              refresh_token: google.refresh_token || '',
            }),
            method: 'POST',
          });

          const tokens: TokenSet = await response.json();
          if (!response.ok) throw tokens;

          await db.account.update({
            data: {
              access_token: tokens.access_token,
              expires_at: Math.floor(
                Date.now() / 1000 + Number(tokens.expires_in)
              ),
              refresh_token: tokens.refresh_token ?? google.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: 'google',
                providerAccountId: google.providerAccountId,
              },
            },
          });
        } catch (error) {
          console.error('Error refreshing access token', error);
          session.error = 'RefreshAccessTokenError';
        }
      }
      return session;
    },
  },

  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 1 * 24 * 60 * 60,
  },

  debug: process.env.NODE_ENV === 'development',
};

/**
 * An overloaded function wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 * You have the option of using it as is, vit automatic validation
 * or passing the  **No-Validate** param to enable handling the validation
 * yourself
 * @see https://next-auth.js.org/configuration/nextjs
 */
export async function getAuthSession(
  param: 'No-Validate'
): Promise<Session | null>;
export async function getAuthSession(): Promise<Session>;
export async function getAuthSession(param?: unknown): Promise<unknown> {
  const session = await getServerSession(options);
  if (param && param === 'No-Validate') return session;
  if (!session)
    throw createHttpError.Unauthorized(
      'Invalid user session. Please login again'
    );

  return session;
}