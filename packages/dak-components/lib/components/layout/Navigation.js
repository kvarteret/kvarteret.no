import { useState } from "react";
import { Link } from "../Link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const NavigationItem = ({ navItem, removeOpenMenus }) => {
  if (!navItem.title) return <></>;

  if (navItem.title === "Om oss") {
    navItem.titl = (
      <p className="nav-item" style={{ position: "relative" }}>
        Om oss <ExpandMoreIcon style={{ position: "absolute" }} />
      </p>
    );
  }

  const isMulti = navItem.multiMenu.length > 0;
  const isButton = navItem.isButton ? " button" : "";

  let url = navItem.url || "#";
  if (isMulti) {
    url = "#";
  }

  const [timer, setTimer] = useState();

  const mouseClick = () => {
    removeOpenMenus();
    const item = document.getElementById(navItem.title);
    if (!item) return;
    item.style.display = "flex";
  };

  const mouseOver = () => {
    setTimer(
      setTimeout(() => {
        mouseClick();
      }, 300)
    );
  };

  const mouseLeave = () => {
    clearTimeout(timer);
    setTimer(null);
  };

  let additionalParams = {};
  if (url.startsWith("http")) {
    additionalParams = { target: "_blank", rel: "noopener noreferrer" };
  }

  return (
    <div className="wrapper">
      <Link href={url} {...additionalParams}>
        <a key={url}>
          <div
            className={"container" + isButton}
            onMouseOver={mouseOver}
            onClick={mouseClick}
            onMouseLeave={mouseLeave}
          >
            {navItem.title === "Om oss" ? (
              <p className="nav-item" style={{ position: "relative" }}>
                Om oss{" "}
                <ExpandMoreIcon
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "100%",
                    transform: "translateY(-40%)",
                  }}
                />
              </p>
            ) : (
              navItem.title
            )}
          </div>
        </a>
      </Link>
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
  );
};

const Navigation = ({ navItems, isRight, removeOpenMenus }) => {
  return (
    <div className="container">
      {navItems.map((x, index) => (
        <NavigationItem
          key={index}
          navItem={x}
          removeOpenMenus={removeOpenMenus}
        />
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
