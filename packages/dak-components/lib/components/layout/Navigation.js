import Link from 'next/link'

const NavigationItem = ({ navItem }) => {
  if (navItem.translations.length == 0) return <></>;

  const text = navItem.translations[0].name;
  const isButton = navItem.is_button ? " button" : "";

  const url = navItem.page?.slug ?? navItem.link?.url ?? "";

//   if(!url) return <></>;

  return (
      <Link href={url}>
        <div className={"container" + isButton}>
        {text}

        <style jsx>
            {`
            .container {
                padding: 8px 30px;
                color: white;
                font-weight: 400;
                cursor: pointer;
                user-select: none;
            }

            .button {
                background-color: var(--primary-color);
                user-select: none;
            }

            .button:hover {
                background-color: #f85b5b;
            }
            .button:active {
                background-color: #f23b3b;
            }

            `}
        </style>
        </div>
    </Link>
  );
};

const Navigation = ({ navItems, isRight }) => {
  return (
    <div className="container">
      {navItems.map((x, index) => (
        <NavigationItem key={index} navItem={x} isRight />
      ))}
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: row;
            justify-content: ${isRight ? "flex-end" : "flex-start"};
            align-items: center;
            flex: 1;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default Navigation;
