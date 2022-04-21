import { BlurImage, ExternalContent } from ".";

const Card = ({ card, fillMode }) => {
  return (
    <div className="card">
        {card?.image &&
      <div className="image">
        <BlurImage
          className="cards-image"
          fadeIn
          objectFit={fillMode || "cover"}
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
          }
          h3 {
            margin: 1px 0;
            margin-bottom: -10px;
          }
          .text-content {
            margin: 7px;
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

const Cards = ({ fillMode, cards, cardsPrRow }) => {
  return (
    <div className="cards">
      {cards?.map((card, i) => (
        <Card fillMode={fillMode} card={card} key={i} />
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
