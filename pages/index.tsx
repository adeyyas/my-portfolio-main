import Layout from "@/layouts/default"
import Typed from 'react-typed';
import Head from "next/head";
import { TITLE, CDN_URL, URL } from "../constants";
import { NextSeo } from "next-seo";

const IndexPage = () => {
  return <>

    <NextSeo
      title={TITLE}
      description="Hello, me Aziz Devrim"
      canonical={URL}
      openGraph={{
        url: URL,
        title: TITLE,
        description: "Hello, me Aziz Devrim",
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
      <title>{TITLE}</title>
    </Head>
  
    <div id="index-page">
      <h2 id="name">{TITLE}</h2>

      <div id="iam">
        <span>{"I'm a "}</span>
        <strong>Backend Developer</strong>
      </div>

      <a href="mailto:azizdevrimy@gmail.com" id="contact-me">CONTACT ME</a>
    </div>
  </>
}

export const getServerSideProps = async () => {
  return { props: { deneme: 'deneme' } }
}

IndexPage.getLayout = page => {
  return <Layout>{page}</Layout>
}

export default IndexPage