// components/Heading.tsx

interface HeadingProps {
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h2 className="text-2xl font-bold mb-6">
      <span className="text-dark-1 dark:text-light-1">{text}</span>
    </h2>
  );
};

export default Heading;
