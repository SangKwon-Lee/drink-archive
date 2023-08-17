import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

// styles
import Providers from '@styles/providers';
import StyledComponentsRegistry from '@styles/registry';

// components
import Header from '@components/layout/header';
import Footer from '@components/layout/footer';
import Nprogress from '@components/commons/nprogress';
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Drink Archive',
  description: 'Drink Archive'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <Providers>
        <html lang="en">
          <body className={roboto.className}>
            <Nprogress />
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </Providers>
    </StyledComponentsRegistry>
  );
}
