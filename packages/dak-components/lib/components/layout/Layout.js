import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, data }) => {
  if (!data) return <> {children} </>;
  return (
    <div className="container">
      <div className="header">
        <Header data={data}/></div>
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
            height: 80px;
            width: 100%;
            background-color: rgba(0,0,0,0.6);
            box-shadow: 0 4px 4px rgb(0 0 0 / 40%);
            backdrop-filter: blur(4px);
            position: fixed;
            z-index: 1100;
          }
          
        `}
      </style>
    </div>
  );
};

export {Layout};
