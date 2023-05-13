import NextAuth from "next-auth"
import { IUserAuth } from 'types/mongodb/User';

export type TAccout = {
  providerAccountId: string | undefined;
  type: string;
  provider: string;
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string
      email: string
      image: string
    },
    expires: Date // This is the expiry of the session, not any of the tokens within the session
    payload?: IUserAuth,
    account: TAccout
  }
}