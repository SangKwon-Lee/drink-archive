import axios from 'axios';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Roboto } from 'next/font/google';
// styles
import Providers from '@styles/providers';
import 'react-toastify/dist/ReactToastify.css';
import StyledComponentsRegistry from '@styles/registry';

// components
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import Nprogress from '@components/commons/Nprogress';
import ToastContainer from '@components/modal/Toast';
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Drink Archive',
  description: 'Drink Archive'
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getUserId() {
  const userToken = cookies().get('_ga_t')?.value;
  if (userToken) {
    try {
      await axios.get(`${API_HOST}/users/me`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      return true;
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isLogin = await getUserId();
  return (
    <StyledComponentsRegistry>
      <Providers>
        <html lang="en">
          <body className={roboto.className}>
            <ToastContainer />
            <Nprogress />
            <Header isLogin={isLogin} />
            {children}
            <Footer />
          </body>
        </html>
      </Providers>
    </StyledComponentsRegistry>
  );
}
