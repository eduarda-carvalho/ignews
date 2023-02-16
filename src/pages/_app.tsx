import { Header } from "@/components/Header";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import App, { AppProps } from "next/app";
import "../styles/global.scss";

export default function MYApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextAuthProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </NextAuthProvider>
    </>
  );
}
