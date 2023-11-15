import Snippet from "./Snippet";

interface SnippetSectionProps {
  title: string;
  code: string;
}

const SnippetSection: React.FC<SnippetSectionProps> = ({ title, code }) => {
  return <Snippet snippet={{ title, code }} />;
};

export default SnippetSection;
