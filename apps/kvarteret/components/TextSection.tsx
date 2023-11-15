import { ExternalContent } from "dak-components";

interface TextSectionProps {
  text: string;
}

const TextSection: React.FC<TextSectionProps> = ({ text }) => {
  return <ExternalContent html={text} />;
};

export default TextSection;
