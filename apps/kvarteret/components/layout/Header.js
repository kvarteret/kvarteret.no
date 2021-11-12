import { BlurImage } from "dak-components";
import Navigation from "./Navigation";
import Link from 'next/link'

const Header = ({ data }) => (
  <div className="container">
    <div className="main-logo">
      <Link href={"/"}><BlurImage layout="fill" image={data.hoved_logo}></BlurImage></Link>
    </div>
    <div className="hamburger"></div>
    <div className="nav left-nav">
      <Navigation navItems={data.navigation.left} />
    </div>
    <div className="logo">
    <Link href={"/"}><BlurImage layout="fill" image={data.logo}></BlurImage></Link>
    </div>
    <div className="nav right-nav">
      <Navigation isRight navItems={data.navigation.right} />
    </div>
    <div className="block"></div>

    <style jsx>{`
      .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .main-logo {
        width: 120px;
        height: 80px;
        position: relative;
        cursor: pointer;
      }

      .logo {
        width: 60px;
        height: 60px;
        margin: 10px;
        position: relative;
        border-radius: 200px;
        cursor: pointer;
      }

      .block {
        width: 80px;
        height: 80px;
      }

      .hamburger {
        display: none;
      }

      .nav {
        flex: 1;
      }

      @media (max-width: 768px) {
        .hamburger {
          display: block;
        }
        .main-logo,
        .nav {
          display: none;
        }
      }
    `}</style>
  </div>
);

export default Header;
