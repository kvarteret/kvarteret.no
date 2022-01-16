import Link from "next/link";
import {useState} from "react";

const NavigationItem = ({ navItem, removeOpenMenus }) => {
  if (!navItem.title) return <></>;

  const isButton = navItem.isButton ? " button" : "";

  let url = navItem.url || "#";

  const [timer, setTimer] = useState();

  const mouseClick = () => {
    removeOpenMenus();
    document.getElementById(navItem.title)?.style.display = "flex";
  }

  const mouseOver = () => {
    setTimer(setTimeout(() => {
      mouseClick();
    }, 300))
  };

  const mouseLeave = () => {
    clearTimeout(timer);
    setTimer(null);
  }

  if(!url.startsWith("http") && !url.startsWith("#")) {
    url = "/" + url;
  }

  //   if(!url) return <></>;

  return (
    <Link href={`${url}`}>
      <a>   
        <div className={"container" + isButton} onMouseOver={mouseOver} onClick={mouseClick} onMouseLeave={mouseLeave}>
          {navItem.title}

          <style jsx>
            {`
              .container {
                padding: 8px 30px;
                color: white;
                font-weight: 400;
                cursor: pointer;
                user-select: none;
                font-size: 16px;
              }
              .container:hover {
                color: var(--primary);
              }
              
              .button:hover {
                color: white;
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
      </a>
    </Link>
  );
};

const Navigation = ({ navItems, isRight, removeOpenMenus }) => {
  return (
    <div className="container">
      {navItems.map((x, index) => (
        <NavigationItem key={index} navItem={x} removeOpenMenus={removeOpenMenus} />
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
