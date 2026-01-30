"use client";

import basics from "@/data/basics.json";
import books from "@/data/books.json";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";

export default function BooksPage() {
  const { name, socialLinks } = basics;

  return (
    <div>
      <Header socialLink={socialLinks[0]} />

      <PageTransition className={"text-base text-dark-2 dark:text-light-2"}>
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
      </PageTransition>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
