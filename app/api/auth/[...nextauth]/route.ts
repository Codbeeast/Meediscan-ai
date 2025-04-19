import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    
  },
  pages: {
    signIn: "/login", // Your custom signup page
    signOut: "/login", // Optional, sets default signOut redirect
  },
});

// ✅ Export GET and POST for Next.js App Router to recognize
export { handler as GET, handler as POST };
