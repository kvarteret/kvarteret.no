import Link from "next/link";

const MenuGroup = ({ group, removeOpenMenus }) => {
  return (
    <div className="container">
      <div className="title">{group.title}</div>
      {group.groups.map((x, i) => {
        let additionalParams = {};
        if (x.url?.startsWith("http")) {
          additionalParams = { target: "_blank", rel: "noopener noreferrer" };
        }
        return (
          <div key={i}>
            <Link href={x.url}>
              <a className="item" onClick={removeOpenMenus} {...additionalParams}>
                {x.title}
              </a>
            </Link>
          </div>
        );
      })}
      <style jsx>
        {`
          .container {
            color: white;
            display: flex;
            flex-direction: column;
            gap: 5px;
          }

          .item:hover {
            color: var(--primary-color);
          }

          .title {
            margin-top: 13px;
            margin-bottom: 5px;
            font-size: 18px;
            font-weight: 500;
            width: 100%;
          }
          .item {
            font-size: 14px;
            color: white;
            font-weight: 200;
            display: block;
            padding: 2px 0;
          }
        `}
      </style>
    </div>
  );
};

const MultiMenu = ({ menuData, removeOpenMenus }) => {
  return (
    <div
      className="container"
      id={menuData.title}
      style={{ display: "none" }}
      onClick={removeOpenMenus}
    >
      <div className="menu" onClick={(e) => e.stopPropagation()}>
        <div className="main-group">{menuData.title}</div>
        {menuData.multiMenu.map((x, i) => (
          <MenuGroup group={x} removeOpenMenus={removeOpenMenus} key={i + "group"} />
        ))}
      </div>

      <style jsx>
        {`
          .container {
            display: flex;
            justify-content: center;
          }

          .menu {
            background-color: rgba(0, 0, 0, 0.7);
            box-shadow: 0 4px 4px rgb(0, 0, 0 / 40%);
            backdrop-filter: blur(4px);
            display: flex;
            padding: 20px;
            gap: 30px;
            padding-bottom: 30px;
          }

          .main-group {
            font-size: 32px;
            color: white;
            margin-right: 20px;
          }
        `}
      </style>
    </div>
  );
};

export { MultiMenu };
