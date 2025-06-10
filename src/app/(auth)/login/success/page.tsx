import { Metadata } from 'next';
import LoginRedirect from './login-redirect';

export const metadata: Metadata = {
  title: 'Setting up...',
};

export default function Page() {
  return <LoginRedirect />;
}
