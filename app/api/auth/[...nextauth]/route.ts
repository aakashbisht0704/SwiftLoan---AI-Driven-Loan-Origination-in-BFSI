import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/app/lib/mongodb";  // Ensure this path is correct
import User from "@/app/models/User";  // Ensure this path is correct
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();  // Connect to MongoDB

        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("No user found");

        const isValidPassword = await bcrypt.compare(credentials!.password, user.password);
        if (!isValidPassword) throw new Error("Invalid password");

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Ensure this page exists
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
