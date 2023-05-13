import "@/public/lib/owlcarousel/assets/owl.carousel.min.css";
import "@/public/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css";
import "@/public/css/bootstrap.min.css";
import "@/public/css/template.css";
import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Component {...pageProps} />
      <Script src="https://code.jquery.com/jquery-3.4.1.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.6.0/umd/popper.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" />
      
      <Script src="js/main.js" />
    </>
  );
}
