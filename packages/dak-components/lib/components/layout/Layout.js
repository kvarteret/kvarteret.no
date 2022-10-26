import Footer from "./Footer";
import { HamburgerMenu } from "./HamburgerMenu";
import Header from "./Header";
import { MultiMenu } from "./MultiMenu";

const Layout = ({ children, data }) => {
  if (!data) return <> {children} </>;

  const removeOpenMenus = () => {
    const ids = [...data.navigation.left.map(x => x.title), ...data.navigation.right.map(x => x.title)];

    for (const id of ids) {
      const item = document.getElementById(id);
      if (!item) continue;
      item.style.display = "none";
    }
  }

  return (
    <HamburgerMenu logo={data.logo} navigation={data.navigation} >
      <div id="main-content" className="container">

        <div className="header" onMouseLeave={removeOpenMenus}>

          <div className="header-bar">
            <Header data={data} removeOpenMenus={removeOpenMenus} />
          </div>

          {data.navigation.left.map((x, i) => {
            if (x.multiMenu.length == 0) return <></>

            return <MultiMenu key={i} menuData={x} removeOpenMenus={removeOpenMenus} />
          })}

          {data.navigation.right.map((x, i) => {
            if (x.multiMenu.length == 0) return <></>

            return <MultiMenu key={i} menuData={x} removeOpenMenus={removeOpenMenus} />
          })}

        </div>
        <div className="content">
          {children}
        </div>
        <div className="footer"><Footer data={data} /></div>
      </div>
      <style key="styling" jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            justify-content: space-between;
            overflow-x: hidden;
          }

          .content {
            flex:1;
          }


          .header {
            width: 100%;
            position: fixed;
            z-index: 900;
          }

          .header-bar {
            height: 80px;
            width: 100%;
            background-color: rgba(0,0,0 ,0.7);
            box-shadow: 0 4px 4px rgb(0 0 0 / 40%);
            backdrop-filter: blur(4px);
            
          }
          
        `}
      </style>
    </HamburgerMenu>
  );
};

export { Layout };
