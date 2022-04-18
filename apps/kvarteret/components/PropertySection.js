import isUrl from "is-url"
import isEmail from "is-email"

const Value = ({value}) => {
  if(isUrl(value)) {
    return <a href={value}>{value}</a>
  }

  if(isEmail(value)) {
    return <a href={`mailto:${value}`}>{value}</a>
  }
  return <span>{value}</span>
}

const DarkBar = ({ properties }) => {
  return (
      <div className="container">
        {properties.map((property, i) => (
          <div key={i} className="item">
            <div className="title">{property.key}:</div>
            <div className="value"><Value value={property.value}/></div>
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

const DarkList = ({ properties }) => {
  return (
      <div className="container">
        {properties.map((property, i) => (
          <>
            <div className="title">{property.key}:</div>
            <div className="value"><Value value={property.value}/></div>
          </>
        ))}
        <style jsx>
          {`
          .title {
              font-weight: 500;
          }

          .value {
            word-break: break-word;
          }
          

            .container {
              font-weight: 100;
              font-size: 16px;
              text-transform: uppercase;
                margin-top: 10px;
                color: white;
              background-color: #313131;
              display: grid;
              max-width: 100%;
              overflow: hidden;
              grid-template-columns: fit-content(50px) 1fr;
              padding: 20px;
              gap: 10px;
            }
          `}
        </style>
      </div>
  );
};

const PropertySection = ({ style, properties }) => {
  if(style === "DARK_BAR") {
    return <DarkBar properties={properties} />;

  } else if(style === "DARK_LIST") {
    return <DarkList properties={properties} />;
    
  }

  return  <DarkBar properties={properties} />;
};

export default PropertySection;
