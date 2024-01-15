import { Account, NextAuthOptions, Session, User } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../prisma/database";
import { compare, hash } from "bcrypt";
import { AdapterUser } from "next-auth/adapters";
import { user } from "@prisma/client";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter Email" },
                password: { label: "Password", type: "password", placeholder: "Enter password" }
            },
            async authorize(credentials, req) {

                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }


                const existingUser = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!existingUser) {
                    return null;
                }

                const passwordMatch = await compare(credentials.password, existingUser.password!);

                if (!passwordMatch) {
                    return null;
                }

                return { id: `${existingUser.id}`, email: existingUser.email, role: existingUser.role };
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "" as string,
            clientSecret: process.env.GOOGLE_SECRET_ID ?? "" as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET as string,

    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account, profile, credentials, email }) {


            const userexist = await prisma.user.findFirst({ where: { email: user.email } });
            if (userexist) {

                return true;
            } else {



                const userfind: user = await prisma.user.create({
                    data: {
                        email: user.email,
                        role: "USER"
                    }
                });
                if (userfind) {

                    return true;
                } else {

                    return false;
                }
            }
        },

        async jwt({
            token,
            user,
        }: {
            token: DefaultJWT;
            user: User | AdapterUser;
            account: Account | null;
        }) {
            if (user) {
                return {
                    ...token,
                    email: user.email,
                    id: user.id,
                    role: user.role
                };
            }
            return token;
        },
        async session({
            session,
            token,
            user,
        }: {
            session: Session;
            token: DefaultJWT;
            user: User;
        }) {
            return { ...session, user: { ...session.user, email: token.email, role: token.role } };
        },
    },
};


