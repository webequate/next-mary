// pages/online-work.tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { OnlineWork } from "@/types/online-work";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import onlineWorks from "@/data/online-work.json";
import Header from "@/components/Header";
import Link from "next/link";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";

type OnlineWorkPageProps = {
  name: string;
  socialLinks: SocialLink[];
  onlineWorks: OnlineWork[];
};

const OnlineWorkPage: NextPage<OnlineWorkPageProps> = ({
  name,
  socialLinks,
  onlineWorks,
}) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name} | Online Work`}</title>
        <meta
          name="description"
          content="Online work by Mary J Johnson."
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
        <Heading text="Online Work" />
        <ul className="list-disc list-outside ml-5">
          {onlineWorks.map((onlineWork, index) => (
            <li key={index} className="mb-4">
              <Link
                href={onlineWork.link}
                className="hover:text-accent-dark dark:hover:text-accent-light"
              >
                {onlineWork.name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<OnlineWorkPageProps> = async () => {
  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      onlineWorks: onlineWorks,
    },
    revalidate: 60,
  };
};

export default OnlineWorkPage;
