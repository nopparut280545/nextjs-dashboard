import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '@/lib/db'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // ค้นหา user จาก email
          const users = await db.query(
            'SELECT * FROM users WHERE email = ?', 
            [email]
          );

          if (!users || users.length === 0) {
            return null;
          }

          const user = users[0];

          // เปรียบเทียบรหัสผ่าน
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          // ส่งข้อมูล user กลับไป (ไม่รวมรหัสผ่าน)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };

        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    }
  }
})

export { handler as GET, handler as POST }