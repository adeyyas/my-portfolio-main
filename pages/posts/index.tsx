import Post from "@/components/Post"
import Layout from "@/layouts/default"
import { fetchPosts } from "@/services/post.service"
import Section from '@/components/Section'
import Head from "next/head"
import { NextSeo } from "next-seo"
import { TITLE, CDN_URL, URL } from "../../constants"

const PostsPage = ({ posts }) => {
  return <>

    <NextSeo
      title={TITLE}
      description="My last posts"
      canonical={`${URL}/posts`}
      openGraph={{
        url: `${URL}/posts`,
        title: TITLE,
        description: "My last posts",
        images: [
          {
            url: `${CDN_URL}me-min.jpg`,
          }
        ],
        siteName: TITLE,
      }}
      twitter={{
        handle: '@adeyyas',
        cardType: 'summary_large_image',
      }}
    />

    <Head>
      <title>{`Posts | ${TITLE}`}</title>
    </Head>

    <Section title='Last Posts'>
      <div id="list-posts">
        {posts.map(post => <Post key={post.id} post={post} />)}
      </div>
    </Section>
  </>
}

export const getServerSideProps = async () => {
  let [err, posts] = await fetchPosts()

  if (err) {
    console.log(err)
    posts = []
  }

  return { props: { posts } }
}

PostsPage.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default PostsPage