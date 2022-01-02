import { Link } from "@material-ui/core";

const MenuGroup = ({group}) => {
    return <div className="container">
        <div className="title">{group.title}</div>
        {group.groups.map((x, i) =>
        <div key={i}> 
            <Link href={`/${x.url || "#"}`}>
                <a className="item">{x.title}</a>
            </Link>
            </div>
        )}
        <style jsx>
            {`
            .container {
                color: white;
                display: flex;
                flex-direction: column;
                gap: 5px;

            }

            .title {
                margin-top: 13px;
                margin-bottom: 5px;
                font-size: 18px;
                font-weight: 500;
            }
            .item {
                font-size: 14px;
                color: white;
                font-weight: 200;
            }
            `}
        </style>
    </div>
};

const MultiMenu = ({menuData}) => {
  return (
    <div className="container" id={menuData.title} style={{display: "none"}}>
        <div className="menu">
    
        <div className="main-group">
            {menuData.title}
        </div>
        {menuData.multiMenu.map((x, i) => <MenuGroup group={x} key={i + "group"} />)}
        </div>

      <style jsx>
        {`
          .container {
            display: flex;
            justify-content: center;
          }

          .menu {
            background-color: rgba(20, 20, 26 ,0.8);
            box-shadow: 0 4px 4px rgb(40, 40, 53 / 40%);
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
