"use client";

import basics from "@/data/basics.json";
import articles from "@/data/articles.json";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function ArticlesPage() {
  const { name, socialLinks } = basics;

  return (
    <div>
      <Header socialLink={socialLinks[0]} />

      <PageTransition className={"text-base text-dark-2 dark:text-light-2"}>
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
      </PageTransition>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
