"use client";

import basics from "@/data/basics.json";
import onlineWorks from "@/data/online-work.json";
import Header from "@/components/Header";
import Link from "next/link";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
import PageTransition from "@/components/PageTransition";

export default function OnlineWorkPage() {
  const { name, socialLinks } = basics;

  return (
    <div>
      <Header socialLink={socialLinks[0]} />

      <PageTransition className={"text-base text-dark-2 dark:text-light-2"}>
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
      </PageTransition>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
