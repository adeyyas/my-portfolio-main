import { fetchPost } from '@/services/post.service';
import SinglePostLayout from '@/layouts/singlePost';
import { useEffect } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { CDN_URL, TITLE, URL } from '../../constants';
import { formatDate } from '../../utils';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const CategoryItem = ({ category }) => {
  return (
    <div className="category" style={{ backgroundColor: category.color }}>
      {' '}
      {category.title}
    </div>
  );
};

const PostPage = ({ post }) => {
  useEffect(() => {
    window.hljs?.configure({ ignoreUnescapedHTML: true });
    window.hljs?.highlightAll();
  }, []);

  return (
    <>
      <NextSeo
        title={`${post.title} | ${TITLE}`}
        description={post.summary}
        canonical={`${URL}/posts/${post.slug}`}
        openGraph={{
          url: `${URL}/posts/${post.slug}`,
          title: `${post.title} | ${TITLE}`,
          description: post.summary,
          images: [
            {
              url: `${CDN_URL}/${post.image.filename}`,
            },
          ],
          siteName: TITLE,
        }}
        twitter={{
          handle: '@adeyyas',
          cardType: 'summary_large_image',
        }}
      />

      <Head>
        <title>{`${post.title} | ${TITLE}`}</title>
      </Head>

      <div id="single-post">
        <div id="post-header">
          <img
            id="post-image"
            src={`${CDN_URL}/${post.image.filename}`}
            alt={post.title}
          />
          <div id="post-categories">
            {post.categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
          <time className="post-time">{formatDate(post.updatedAt)}</time>
        </div>

        <div id="post-content">
          <h1 className="post-title">{post.title}</h1>

          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{
              __html: `<p class='post-summary'>${post.summary || ''}</p> ${
                post.htmlContent || ''
              }`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const [err, result] = await fetchPost(params.slug);

  if (err) {
    return { notFound: true };
  }

  return {
    props: {
      post: result,
    },
  };
};

PostPage.getLayout = (page) => {
  return <SinglePostLayout>{page}</SinglePostLayout>;
};

export default PostPage;
