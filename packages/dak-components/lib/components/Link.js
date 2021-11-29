import NextLink from "next/link";

const Link = ({ href, children }) => {
  if (!href) return <>{children}</>;
  return (
      <NextLink href={href}><>{children}</></NextLink>
  );
};

export default Link;