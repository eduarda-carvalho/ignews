import { Header } from "@/components/Header";
import App, { AppProps } from "next/app";
import "../styles/global.scss";

export default function MYApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
