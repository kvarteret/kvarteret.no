const Footer = ({}) => {
  return (
    <div className="container">

        <div>TODO</div>
      <style jsx>
        {`
          .container {
            height: 356px;
            background-color: #2d2d2d;

            display: flex;
            flex-direction: row;
            justify-content: space-evenly;

            background: url("/footer_bergen.png");
            background-color: #272727;
            background-size: cover;
            background-blend-mode: color-dodge;
            background-position-x: center;
          }
        `}
      </style>
    </div>
  );
};

export default Footer;
