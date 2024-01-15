import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    role: string;
  }
  interface Session {

    user: {
      name: string;
      email?: string;
      id?: string;
      accessToken?: string;
      exp: bigint;
      image: string;
      role: string;

    };
    token: {
      username: string;
    }
    accessToken: string;
  }
  interface JWT {
    accessToken: string;
    expires_at: number;
  }
}