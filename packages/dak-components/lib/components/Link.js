import React from "react"
import NextLink from "next/link";

const Link = ({ href, target, rel, children, locale }) => {
  if (!href) return <>{children}</>;
  if(href.startsWith("http")) {
    return (
        <>
          {React.cloneElement(children, { href, target, rel, children, locale })}
        </>
    );
  }
  return (
      <NextLink href={href} target={target} rel={rel} locale={locale}>{children}</NextLink>
  );
};

export {Link};