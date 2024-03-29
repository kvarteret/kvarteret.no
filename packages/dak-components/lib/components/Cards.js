import { BlurImage, ExternalContent } from ".";

const Card = ({ card }) => {
  return (
    <div className="card">
      {card?.image && (
        <div className="image">
          <BlurImage
            className="cards-image"
            fadeIn
            objectFit="contain"
            layout="fixed"
            width={130}
            height={130}
            image={card?.image}
          />
        </div>
      )}
      <div className="text-content">
        <h3 className="title">{card?.title}</h3>
        <div className="content">
          <ExternalContent html={card?.text} />
        </div>
      </div>

      <style jsx global>
        {`
          .cards-image {
            border-radius: 65px;
          }
        `}
      </style>
      <style jsx>
        {`
          .card {
            flex: 1 1 220px;
            transition: 100ms;
            border-radius: 5px;
            cursor: unset;
          }
          .title {
            color: black;
          }
          h3 {
            margin: 1px 0;
            margin-bottom: 10px;
          }
          .text-content {
            margin: 7px;
            text-align: center;
          }
          .image {
            height: 130px;
            width: 100%;
            display: flex;
            justify-content: center;
            position: relative;
            transition: 500ms;
          }
          .image:hover {
            transform: ${card?.image?.id ===
            "db1ab2cf-6fb8-4be5-bab9-9f615b6dee7d"
              ? "rotate(360deg);"
              : "rotate(0deg);"};
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
            padding:20px 0 0 20px;
            display: flex;
            flex-wrap: wrap; 
           gap: 20px;
            );
          }
        `}
      </style>
    </div>
  );
};

export { Cards };
