import Footer from "./Footer";
import Header from "./Header";
import { MultiMenu } from "./MultiMenu";

const Layout = ({ children, data }) => {
  if (!data) return <> {children} </>;

  const removeOpenMenus = () => {
    const ids = [...data.navigation.left.map(x=>x.title), ...data.navigation.right.map(x=>x.title)];

    for(const id of ids) {
      document.getElementById(id)?.style.display = "none";
    }
  }

  return (
    <div className="container">
      <div className="header" onMouseLeave={removeOpenMenus}>
        <div className="header-bar">
          <Header data={data} removeOpenMenus={removeOpenMenus}/>
        </div>
        {data.navigation.left.map(x=> {
          if(x.multiMenu.length == 0) return <></>

          return <MultiMenu menuData={x} />
        })}
        {data.navigation.right.map(x=> {
          if(x.multiMenu.length == 0) return <></>

          return <MultiMenu menuData={x} />
        })}
      </div>
      <div className="content">
        {children}
      </div>
      <div className="footer"><Footer data={data} /></div>

      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            justify-content: space-between;
          }

          .header {
            width: 100%;
            position: fixed;
            z-index: 1100;
          }

          .header-bar {
            height: 80px;
            width: 100%;
            background-color: rgba(0,0,0,0.6);
            box-shadow: 0 4px 4px rgb(0 0 0 / 40%);
            backdrop-filter: blur(4px);
            
          }
          
        `}
      </style>
    </div>
  );
};

export {Layout};
