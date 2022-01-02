import { BlurImage, ExternalContent } from ".";

const Card = ({ card }) => {
  return (
    <div className="card">
        {card?.image &&
      <div className="image">
        <BlurImage
          className="cards-image"
          fadeIn
          objectFit="cover"
          layout="fill"
          image={card?.image}
        />
      </div>
        }
      <div className="text-content">
        <h3 className="title">{card?.title}</h3>
        <div className="content">
          <ExternalContent html={card?.text} />
        </div>
      </div>

      <style jsx global>
        {`
          .cards-image {
            border-radius: 5px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            transition: 200ms;
          }
        `}
      </style>
      <style jsx>
        {`
          .card {
            width: 100%;
            transition: 100ms;
            border-radius: 5px;
            cursor: unset;
            box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
              0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
          }
          h3 {
            margin: 1px 0;
            margin-bottom: -10px;
          }
          .text-content {
            padding: 16px;
          }
          .image {
            height: 217px;
            width: 100%;
            position: relative;
            margin-bottom: 5px;
          }
        `}
      </style>
    </div>
  );
};

const Cards = ({ cards, cardsPrRow }) => {
  return (
    <div className="cards">
      {cards?.map((card, i) => (
        <Card card={card} key={i} />
      ))}
      <style jsx>
        {`
          .cards {
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(
              auto-fill,
              minmax(${1080 / ((cardsPrRow || 3) + 1)}px, 1fr)
            );
          }
        `}
      </style>
    </div>
  );
};

export { Cards };
