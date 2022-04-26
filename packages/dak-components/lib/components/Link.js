import React from "react"
import NextLink from "next/link";

const Link = ({ href, target, rel, children, locale }) => {
  if (!href) return <>{children}</>;
  if(href.startsWith("http")) {
    const childrenWithProps = React.Children.map(children, child => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { href, target, rel, children, locale });
      }
      return child;
    });
    return (
        <>
          {childrenWithProps}
        </>
    );
  }
  return (
      <NextLink href={href} target={target} rel={rel} locale={locale}>{children}</NextLink>
  );
};

export {Link};