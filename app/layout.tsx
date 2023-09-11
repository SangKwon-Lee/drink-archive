import axios from 'axios';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Roboto } from 'next/font/google';
import { headers } from 'next/headers';
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

// ts-prune-ignore-next
// export const metadata: Metadata =
export async function generateMetadata(params: any): Promise<Metadata> {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  const newPathname = pathname.replace('/', '');
  return {
    title: `Drink Archive | ${newPathname}`,
    description: 'Drink Archive 주류 후기',
    openGraph: {
      title: `Drink Archive | ${newPathname}`,
      description: 'Drink Archive 주류 후기',
      url: 'https://drink-archive.vercel.app',
      siteName: 'Drink Archive',
      images: '/icon/icon_favicon.png',
      type: 'website'
    },
    icons: '/icon/icon_favicon.png',
    robots: 'all',
    keywords: 'Drink Archive, 주류, 후기, 맥주, 와인, 양주, 위스키, 맥주 후기'
  };
}

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
