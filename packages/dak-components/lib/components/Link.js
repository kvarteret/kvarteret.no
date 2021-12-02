import NextLink from "next/link";

const Link = ({ href, children, locale }) => {
  if (!href) return <>{children}</>;
  return (
      <NextLink href={href} locale={locale}><>{children}</></NextLink>
  );
};

export {Link};