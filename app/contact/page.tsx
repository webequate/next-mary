"use client";

import basics from "@/data/basics.json";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import ContactDetails from "@/components/ContactDetails";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function ContactPage() {
  const { name, contactIntro, location, phone, website, socialLinks } = basics;

  return (
    <div>
      <Header socialLink={socialLinks[0]} />

      <PageTransition>
        <div className="flex flex-col-reverse lg:flex-row text-base text-dark-2 dark:text-light-2">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 md:mr-6">
            <ContactForm />
          </div>

          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 md:ml-6">
            <ContactDetails
              name={name}
              contactIntro={contactIntro}
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
