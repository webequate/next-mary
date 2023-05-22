// components/AboutContent.tsx

interface AboutContentProps {
  aboutIntro: string;
  aboutItems: string[];
}

const AboutContent: React.FC<AboutContentProps> = ({
  aboutIntro,
  aboutItems,
}) => {
  return (
    <div className="text-dark-2 dark:text-light-2">
      <h1 className="text-2xl font-bold mb-6">
        <span className="text-accent-dark dark:text-accent-light">
          {aboutIntro}
        </span>
      </h1>
      <div className="mb-8">
        {aboutItems.map((aboutItem, index) => (
          <p key={index} className="mb-4">
            {aboutItem}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutContent;
