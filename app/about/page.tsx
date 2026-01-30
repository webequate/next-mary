"use client";

import basics from "@/data/basics.json";
import Header from "@/components/Header";
import AboutContent from "@/components/AboutContent";
import AboutDetails from "@/components/AboutDetails";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function AboutPage() {
  const { aboutIntro, aboutItems, name, location, phone, website, socialLinks } = basics;

  return (
    <div>
      <Header socialLink={socialLinks[0]} />

      <PageTransition>
        <div className="flex flex-col lg:flex-row-reverse text-base text-dark-2 dark:text-light-2">
          <div className="w-full lg:w-3/5 mb-2 lg:mb-0 lg:ml-6">
            <AboutContent aboutIntro={aboutIntro} aboutItems={aboutItems} />
          </div>

          <div className="w-full lg:w-2/5 mb-2 lg:mb-0 lg:mr-6">
            <AboutDetails
              name={name}
              location={location}
              phone={phone}
              website={website}
            />
          </div>
        </div>
      </PageTransition>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
