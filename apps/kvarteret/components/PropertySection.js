const DarkBar = ({ properties }) => {
  return (
      <div className="container">
        {properties.map((property, i) => (
          <div key={i} className="item">
            <div className="title">{property.key}:</div>
            <div className="value">{property.value}</div>
          </div>
        ))}
        <style jsx>
          {`
          .title {
              font-weight: 500;
          }
          .item {
              display: flex;
              gap: 10px;
              font-size: 16px;
              text-transform: uppercase;
          }
            .container {
                margin-top: 10px;
                color: white;
              height: 50px;
              background-color: #313131;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              gap: 20px;
            }
          `}
        </style>
      </div>
  );
};

const PropertySection = ({ style, properties }) => {
  return <DarkBar properties={properties} />;
};

export default PropertySection;
