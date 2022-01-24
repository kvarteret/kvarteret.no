import NextLink from "next/link";

const Link = ({ href, target, rel, children, locale }) => {
  if (!href) return <>{children}</>;
  return (
      <NextLink href={href} target={target} rel={rel} locale={locale}><a>{children}</a></NextLink>
  );
};

export {Link};