import Layout from "@/layouts/default"
import Section from "@/components/Section"
import Head from "next/head"
import { NextSeo } from "next-seo"
import { CDN_URL, TITLE, URL } from "../constants"

const AboutPage = () => {
  return <>

    <NextSeo
      title={TITLE}
      description="Hi, i'am Aziz Devrim"
      canonical={`${URL}/about`}
      openGraph={{
        url: `${URL}/about`,
        title: TITLE,
        description: "Hi, i'am Aziz Devrim",
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
      <title>{`About Me | ${TITLE}`}</title>
    </Head>

    <div id="about-page">
      <Section title='About Me'>
        <p className="about-name">Hello World</p>
      </Section>
                                                      {/* buralara bakılacak */}
      <Section title='Frontend Technologies'>
        <div className="list-images">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
        </div>
      </Section>

      <Section title='Backend Technologies'>
        <div className="list-images">
         <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png" alt="CSharp" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/.NET_Core_Logo.svg" alt=".NetCore" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
        </div>
      </Section>

      <Section title='Tools'>
        <div className="list-images">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
          <img src="https://user-images.githubusercontent.com/7853266/44114706-9c72dd08-9fd1-11e8-8d9d-6d9d651c75ad.png" alt="Postman" />
          <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" alt="Visual Studio Code" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Visual_Studio_Logo_%282013-2017%29.svg"alt="Visual Studio"/>
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/9c/IntelliJ_IDEA_Icon.svg" alt="Intellij-Rider" />
          <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png" alt="Terminal" />
        </div>
      </Section>
    </div>
  </>
}

export const getServerSideProps = async () => {
  return { props: {} }
}

AboutPage.getLayout = page => {
  return <Layout>{page}</Layout>
}

export default AboutPage