import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) => {
            if (token && new Date() > new Date((token as any).exp))
                return true;
            return false;
        },
    },
    pages: {
        signIn: "/login",
    },
});
export const config = {
    matcher: ["/dashboard/:path*", "/createagency/:path*"],
};