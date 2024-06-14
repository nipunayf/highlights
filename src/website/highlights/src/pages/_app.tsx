import '@mantine/core/styles.css';

import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../authConfig';
import PageLayout from '@/components/PageLayout';

const msalInstance = new PublicClientApplication(msalConfig);

const theme = createTheme({
    /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MsalProvider instance={msalInstance}>
            <MantineProvider theme={theme}>
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            </MantineProvider>
        </MsalProvider>
    );
}