/* eslint-disable @next/next/no-css-tags */
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <link rel="stylesheet" href="/fontawesome5/css/all.min.css" />
        <link rel="stylesheet" href="/github-markdown.css" />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/github.min.css"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />

        <Script
          src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"
          strategy="afterInteractive"
        />
        <Script id="code-highlight" strategy="lazyOnload">
          {`
            hljs.configure({ ignoreUnescapedHTML: true });
            hljs.highlightAll();
        `}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y389N6FTVC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Y389N6FTVC');
        `}
        </Script>

        <Script
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5106384346328058"
          crossOrigin="anonymous"
        ></Script>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
