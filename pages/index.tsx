// pages/index.tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import Social from "@/components/Social";
import ThemedImage from "@/components/ThemedImage";
import Footer from "@/components/Footer";

type HomePageProps = {
  name: string;
  titles: string[];
  summaryItems: string[];
  socialLinks: SocialLink[];
};

const HomePage: NextPage<HomePageProps> = ({
  name,
  titles,
  summaryItems,
  socialLinks,
}) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name}`}</title>
        <meta
          name="description"
          content="Mary J Johnson's website."
          key="desc"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-3/5 mb-10 lg:mb-0 md:mr-6">
            <div className="mb-6 text-lg sm:text-xl md:text-xl lg:text-2xl font-bold tracking-tight text-accent-dark dark:text-accent-light">
              {titles.map((title, index) => (
                <h2 key={index}>
                  <span>{title}</span>
                </h2>
              ))}
            </div>
            <div className="mb-4">
              {summaryItems.map((summaryItem, index) => (
                <p
                  key={index}
                  className="text-base text-dark-2 dark:text-light-2 mb-4"
                >
                  {summaryItem}
                </p>
              ))}
            </div>
            <div className="flex justify-left mb-4">
              <Social socialLinks={socialLinks} />
            </div>
          </div>

          <div className="w-full lg:w-2/5 mb-10 lg:mb-0 md:ml-6">
            <motion.div
              initial={{ opacity: 0, y: -180 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
              className="sm:ml-10"
            >
              <ThemedImage />
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  return {
    props: {
      name: basics.name,
      titles: basics.titles,
      summaryItems: basics.summaryItems,
      socialLinks: basics.socialLinks,
    },
    revalidate: 60,
  };
};

export default HomePage;
