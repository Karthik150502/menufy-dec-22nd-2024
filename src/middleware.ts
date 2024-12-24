import { withAuth } from "next-auth/middleware"

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    pages: {
        signIn: "/auth/sign-in",
        error: "/auth/error",
    },
    callbacks: {
        authorized({ token }) {
            if (token) {
                return true
            } // If there is a token, the user is authenticated
            return false
        }
    }
})

export const config = { matcher: ["/dashboard(.*)"] }