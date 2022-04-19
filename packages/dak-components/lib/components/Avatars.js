import { BlurImage, ExternalContent } from ".";

const Avatar = ({ card }) => {
  return (
    <div className="avatar">
        {card?.image &&
      <div className="image">
        <BlurImage
          className="avatar-image"
          fadeIn
          objectFit="contain"
          layout="fixed"
          width={130}
          height={130}
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
        .avatar-image {
          border-radius: 65px;
        }
        `}
      </style>
      <style jsx>
        {`
          .avatar {
            width: 100%;
            transition: 100ms;
            border-radius: 5px;
            cursor: unset;
          }
          .title {
            color: black;
          }
          h3 {
            margin: 1px 0;
            margin-bottom: -10px;
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
          transform: ${card?.image?.id === "db1ab2cf-6fb8-4be5-bab9-9f615b6dee7d" ? "rotate(360deg);" : "rotate(0deg);"}

          }
        `}
      </style>
    </div>
  );
};

const Avatars = ({ cards, cardsPrRow }) => {
  return (
    <div className="avatars">
      {cards?.map((card, i) => (
        <Avatar card={card} key={i} />
      ))}
      <style jsx>
        {`
          .avatars {
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(
              auto-fit,
              minmax(${1080 / ((cardsPrRow || 3) + 1)}px, 1fr)
            );
          }
        `}
      </style>
    </div>
  );
};

export { Avatars };
