import { BlurImage } from "dak-components";
import Link from "../Link";
import OpeningHours from "../OpeningHours";
import Title from "../Title";

const OpeningHoursSection = ({ openingHours }) => {
  if(openingHours?.length <= 0) return <></>
  return (
    <div className="container">
      <Title underlined color="white" underlineColor="#707070">
        Åpningstider
      </Title>
      <OpeningHours light openingHours={openingHours} />

      <style jsx>
        {`
          .container {
            color: whtie;
          }
        `}
      </style>
    </div>
  );
};

const SocialMediaItem = ({ item }) => (
  <div className="container">
    <a href={item.url ?? "/"} target="_blank" rel="noopener noreferrer">
      <BlurImage
        className="someImage"
        image={item.icon}
        width="60"
        height="60"
      />
    </a>
    <style jsx global>
      {`
        .someImage:hover {
          filter: brightness(1.4);
          cursor: pointer;
        }
        .someImage:active {
          filter: brightness(0.8);
          cursor: pointer;
        }
      `}
    </style>

    <style jsx>
      {`
        .container {
          width: 60px;
          height: 60px;
        }
      `}
    </style>
  </div>
);

const SocialMedia = ({ socialMedia }) => (
  <div className="container">
    {socialMedia.map((x, i) => (
      <SocialMediaItem key={i} item={x} />
    ))}
    <style jsx>
      {`
        .container {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          flex: 1;
        }

        
      `}
    </style>
  </div>
);

const Address = ({}) => (
  <div>
    <Title underlined color="white" underlineColor="#707070">
      Det Akademiske Kvarter
    </Title>
    <div className="container">
      <div className="section">
        <div className="title">Besøksaddresse</div>
        <div className="text">Olav kyrres gate 49</div>
        <div className="text">5015 Bergen</div>
      </div>
      <div className="section">
        <div className="title">Postaddresse</div>
        <div className="text">Postboks 1822 Håkonsgaten</div>
        <div className="text">5866 Bergen</div>
      </div>
    </div>
    <style jsx>
      {`
        .container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 15px;
        }

        .section {
          margin: 20px 0px;
        }
        .title {
          color: white;
          font-size: 14px;
          line-height: 1.6;
          font-weight: 500;
          text-transform: uppercase;
        }

        .text {
          font-size: 14px;
          line-height: 1.6;
          text-transform: uppercase;
          color: #929292;
        }
      `}
    </style>
  </div>
);

const Footer = ({ data }) => {
  return (
    <div className="container">
      <div className="content">
        <div className="address">
          <Address />
        </div>
        <div className="social-media">
          <SocialMedia socialMedia={data.socialMedia} />
        </div>
        <div className="opening-hours">
          <OpeningHoursSection openingHours={data.openingHours} />
        </div>
      </div>
      <div className="copyright">
        Copyright © 2021 Studentkulturhuset i Bergen AS (org. nr. 973 199 986
        MVA) - ❤️ fra IT-gruppen
      </div>
      <style jsx>
        {`
          .container {
            min-height: 356px;
            background-color: #2d2d2d;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            background: url("/footer_bergen.png");
            background-color: #272727;
            background-size: cover;
            background-blend-mode: color-dodge;
            background-position-x: center;
          }

          .content {
            flex: 1;
            max-width: 1300px;
            padding: 20px;
            padding-top: 90px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            width: 100%;
          }

          .copyright {
            color: var(--primary-color);
            text-align: center;
          }
          .social-media {
            flex: 1;
          }
          .opening-hours {
            width: 250px;
          }

          
          @media(max-width: 992px) {
            .container {
              padding: 10px;
            }
            .content {
              flex-direction: column;
              gap: 60px;
            }

            .social-media {
              width: 100%;
              order: 1;
            }

            .opening-hours {
              width: 100%;
              order: 2;
            }

            .address {
              order: 3;
              width: 100%;
            }

            .copyright {
              margin: 0 15px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Footer;
