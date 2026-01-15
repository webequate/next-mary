// pages/books.tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { Book } from "@/types/book";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import books from "@/data/books.json";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

type BooksPageProps = {
  name: string;
  socialLinks: SocialLink[];
  books: Book[];
};

const BooksPage: NextPage<BooksPageProps> = ({ name, socialLinks, books }) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name} | Books`}</title>
        <meta
          name="description"
          content="Books by Mary J Johnson."
          key="desc"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://maryjjohnson.com/books" />
      </Head>

      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className={"text-base text-dark-2 dark:text-light-2"}
      >
        <Heading text="Books" />
        <ul className="flex justify-between">
          {books.map((book, index) => (
            <li key={index} className="mx-2">
              <Link
                key={index}
                href={book.link}
                title={book.name}
                className="text-accent-dark dark:text-accent-light"
              >
                <Image
                  src={`/${book.image}`}
                  alt={book.name}
                  width={300}
                  height={400}
                  className="rounded shadow-md transition ease-in-out transform duration-300"
                />
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<BooksPageProps> = async () => {
  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      books: books,
    },
    revalidate: 60,
  };
};

export default BooksPage;
