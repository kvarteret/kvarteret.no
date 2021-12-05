import { BlurImage } from "../BlurImage";
import Navigation from "./Navigation";
import Link from "next/link";
import { useRouter } from "next/router";

import { Divider } from "../Divider";

const LanguageItem = ({ locale, text }) => {
  const router = useRouter();
  const sameLang = router.locale === locale;

  return (
    <Link href={router.asPath} locale={locale}>
      <a>
        {text}
        <style jsx>
          {`
            a {
              color: ${sameLang
                ? "var(--primary-color)"
                : "var(--light-color)"};
              font-weight: ${sameLang ? "600" : "400"};
              text-decoration: none;
              font-size: 12px;
            }
          `}
        </style>
      </a>
    </Link>
  );
};

const LanguageSelector = () => {
  return (
    <div>
      <LanguageItem locale="no" text="NO" />
      <Divider color="white" />
      <LanguageItem locale="en" text="EN" />

      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 5px;
          }
        `}
      </style>
    </div>
  );
};

const Header = ({ data, removeOpenMenus }) => {

  return (
    <div className="container">
      <div className="main-logo">
        <Link href={"/"}>
          <BlurImage layout="fill" image={data.hoved_logo} priority></BlurImage>
        </Link>
      </div>
      <div className="block hamburger"></div>
      <div className="nav left-nav">
        <Navigation navItems={data.navigation.left} removeOpenMenus={removeOpenMenus} />
      </div>
      <div className="logo">
        <Link href={"/"}>
          <BlurImage layout="fill" image={data.logo} priority></BlurImage>
        </Link>
      </div>
      <div className="nav right-nav">
        <Navigation isRight navItems={data.navigation.right} removeOpenMenus={removeOpenMenus} />
      </div>
      <div className="block language">
        <LanguageSelector />
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 10px;
          flex: 1;
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
          width: 120px;
          height: 80px;
        }

        .hamburger {
          display: none;
        }

        .language {
          display: flex;
          justify-content: center;
          align-items: center;
          border-left: 1px solid rgba(0, 0, 0, 0.12);
        }

        .nav {
          flex: 1;
        }

        @media (max-width: 992px) {
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
};

export default Header;
