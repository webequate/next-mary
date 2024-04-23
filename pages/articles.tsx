// pages/articles.tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { Article } from "@/types/article";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import articles from "@/data/articles.json";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import Link from "next/link";
import Footer from "@/components/Footer";

type ArticlesPageProps = {
  name: string;
  socialLinks: SocialLink[];
  articles: Article[];
};

const ArticlesPage: NextPage<ArticlesPageProps> = ({
  name,
  socialLinks,
  articles,
}) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name} | Articles`}</title>
        <meta
          name="description"
          content="Articles by Mary J Johnson."
          key="desc"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className={"text-base text-dark-2 dark:text-light-2"}
      >
        <Heading text="Articles" />
        <ul className="list-disc list-outside ml-5">
          {articles.map((article, index) => (
            <li key={index} className="mb-4">
              {article.link && (
                <Link
                  href={article.link}
                  className="hover:text-accent-dark dark:hover:text-accent-light"
                >
                  {article.name}
                </Link>
              )}
              {!article.link && article.name}
            </li>
          ))}
        </ul>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesPageProps> = async () => {
  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      articles: articles,
    },
    revalidate: 60,
  };
};

export default ArticlesPage;
