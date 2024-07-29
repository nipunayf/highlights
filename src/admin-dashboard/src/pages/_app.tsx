// pages/_app.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react';
import { AuthenticationResult, EventType, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../authConfig';

export const msalInstance = new PublicClientApplication(msalConfig);

if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.enableAccountStorageEvents();

msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS
        ||
        event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        ||
        event.eventType === EventType.SSO_SILENT_SUCCESS
    ) {
        const account = (event.payload as AuthenticationResult)?.account;
        if (account) {
            msalInstance.setActiveAccount(account);
        }
    }
});

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
    <MsalProvider instance={msalInstance}>
      <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MsalAuthenticationTemplate>
    </MsalProvider>
  );
}

export default MyApp;
