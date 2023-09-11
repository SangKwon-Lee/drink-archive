import { Metadata } from 'next';
import LoginSignupPage from '@components/page/Loginsignup';

// ts-prune-ignore-next
export const metadata: Metadata = {
  title: 'Drink Archive | Login',
  openGraph: {
    title: 'Drink Archive | Login'
  }
};

export default function Login() {
  return (
    <>
      <LoginSignupPage />
    </>
  );
}
