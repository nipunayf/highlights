// pages/_app.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    // Redirect from root URL to /dashboard
    if (pathname === '/') {
      router.push('/dashboard');
    }
  }, [pathname, router]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
