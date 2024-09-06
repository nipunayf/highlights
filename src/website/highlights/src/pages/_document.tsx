import { Head, Html, Main, NextScript } from 'next/document';
import { ColorSchemeScript } from '@mantine/core';
import Script from 'next/script';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <ColorSchemeScript defaultColorScheme="auto" />
                <link rel="icon" href="/favicon.png" sizes="any" />
                <Script strategy='beforeInteractive' src="https://accounts.google.com/gsi/client"></Script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}