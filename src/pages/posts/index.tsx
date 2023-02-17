import styles from "./styles.module.scss";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostProps {
  posts: Post[];
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head> Posts | ig.news</Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} legacyBehavior>
              <a key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.getByType("post", {
    fetch: ["Post.title.data", "Post.content"],
  });
  console.log("resposta:", JSON.stringify(response, null, 2));

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find(
          (content: { type: string }) => content.type === "paragraph"
        )?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: { posts },
  };
};
