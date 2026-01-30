"use client";

import basics from "@/data/basics.json";
import Header from "@/components/Header";
import Social from "@/components/Social";
import ThemedImage from "@/components/ThemedImage";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function HomePage() {
  const { name, titles, summaryItems, socialLinks } = basics;

  return (
    <div>
      <Header socialLink={socialLinks[0]} />

      <PageTransition>
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
            <PageTransition>
              <ThemedImage />
            </PageTransition>
          </div>
        </div>
      </PageTransition>
      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
