import React from "react";
import Head from "next/head";
import { useEffect } from "react";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  title = "Mary J Johnson",
  children,
}) => {
  useEffect(() => {
    document.body.classList.add("flex");
    document.body.classList.add("flex-col");
    document.body.classList.add("bg-light-1");
    document.body.classList.add("dark:bg-black");
  });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Mary J Johnson's education consulting website."
          key="desc"
        />
        <meta property="og:title" content="Mary J Johnson's website." />
        <meta
          property="og:description"
          content="Mary J Johnson's education consulting website."
        />
        <meta
          property="og:image"
          content="https://portfolio.webequate.com/images/mary-og.jpg"
        />
        <meta property="og:url" content="https://maryjjohnson.com" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/mary.png" />
      </Head>
      <main className="min-h-screen bg-white dark:bg-neutral-900 sm:border-x border-dark-3 dark:border-light-3 px-4 sm:px-8 lg:px-16">
        <div className="bg-white dark:bg-neutral-900">{children}</div>
      </main>
    </>
  );
};

export default Layout;
