// components/Footer.tsx
import { SocialLink } from "@/types/basics";
import Social from "@/components/Social";
import Copyright from "@/components/Copyright";
import WebEquate from "@/components/WebEquate";
import Link from "next/link";
import { useRouter } from "next/router";

interface FooterProps {
  name: string;
  socialLinks: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ name, socialLinks }) => {
  const router = useRouter();
  const asPath = router.asPath;

  // Determine if the link should be active based on the prefix in the path
  const isActive = (path: string) => {
    if (path === "/") {
      return asPath === "/" || asPath.startsWith("/featured"); // Home & featured
    }
    return asPath.startsWith(path); // Other prefixes
  };

  return (
    <div className="mx-auto">
      <div className="pb-8 mt-4 border-t-2 border-light-1 dark:border-dark-2">
        <div>
          {/* Footer links - large screen */}
          <div className="m-0 mt-8 hidden sm:flex sm:p-0 justify-center items-center">
            <div className="nav-secondary">
              <Link
                href="/"
                aria-label="Home"
                className={isActive("/") ? "active" : ""}
              >
                Home
              </Link>
              <Link
                href="/about"
                aria-label="About"
                className={isActive("/about") ? "active" : ""}
              >
                About
              </Link>
              <Link
                href="/books"
                aria-label="Books"
                className={isActive("/books") ? "active" : ""}
              >
                Books
              </Link>
              <Link
                href="/articles"
                aria-label="Articles"
                className={isActive("/articles") ? "active" : ""}
              >
                Articles
              </Link>
              <Link
                href="/online-work"
                aria-label="Online Work"
                className={isActive("/online-work") ? "active" : ""}
              >
                Online Work
              </Link>
              <Link
                href="/contact"
                aria-label="Contact"
                className={isActive("/contact") ? "active" : ""}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-6">
            <Social socialLinks={socialLinks} />
          </div>
          <div className="flex justify-center">
            <Copyright name={name} />
          </div>
          <div className="flex justify-center">
            <WebEquate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
