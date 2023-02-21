import { getPrismicClient } from 'src/services/prismic';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { ParsedUrlQuery } from 'querystring';
import styles from './post.module.scss';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });

  const { slug } = params as IParams;
  console.log('params', slug);

  const prismic = getPrismicClient();

  console.log('prismic:', prismic);

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  };
  return {
    props: {
      post,
    },
  };
};
// router.push({
//   pathname:'/posts/copia/',
//   query:{
//    time: post.updatedAt,
//    strong: post.title,
//    post:post.excerpt
//   },
// },
// pathname,{
//   shallow: true
// })
