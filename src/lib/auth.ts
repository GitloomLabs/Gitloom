import authConfig from '@/configs/auth.config';
import NextAuth from 'next-auth';

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
});
