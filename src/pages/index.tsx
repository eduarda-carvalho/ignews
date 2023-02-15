import { SubscribeButton } from "@/components/SubscribeButton";
import Head from "next/head";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏Hey, welcome</span>
          <h1>
            News about <span>Teste Bugfix</span> world.
          </h1>
          <p>
            Get acess to all the publication <br />
            <span> for $9.99 month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="./img/avatar.png" alt="Girl coding" />
      </main>
    </>
  );
  0;
}
