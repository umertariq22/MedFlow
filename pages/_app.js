import "@/styles/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script src="https://unpkg.com/@popperjs/core@2"/>
      </Head>

      <Component {...pageProps} />
      <Script
        src="/jquery.min.js"
        />
      <Script
        src="/popper.min.js"
      />
      <Script src="/bootstrap.min.js" />
    </>
  );
}
