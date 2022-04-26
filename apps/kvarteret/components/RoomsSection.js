import { ExternalContent } from "dak-components";
import Link from "next/link";
import GallerySection from "./GallerySection";

const Room = ({ name, floor, gallery, page, room_translations }) => {
  const translation = room_translations[0];
  const tags = translation?.tags || [];
  const description = translation?.description;
  return (
    <Link href={page?.slug ? `/${page.slug}` : "#"}>
      <a className="room">
        <div className="gallery">
          <GallerySection objectFit="cover" gallery={gallery} layout="fill" />
        </div>
        <div className="content">
          <h3>{name}</h3>
          <div className="split">
            <div>
              <div className="description">
                <ExternalContent html={description} />
              </div>
            </div>
            <div>
              <div className="tags">
                {tags.map((x, i) => {
                  return (
                    <div key={i}>
                      <b>{x.name}</b>: {x.value}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <style jsx global>
          {`
            .carousel-image {
              border-radius: 5px;
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }

            .description p {
              margin-block-start: 0;
              margin-block-end: 0;
            }
          `}
        </style>
        <style jsx>
          {`
          a {
            color: black;
          }
            .room {
              padding: 0px;
              width: 100%;
              display: flex;
              transition: 400ms;
              flex-direction: column;
              border-radius: 5px;
              cursor: pointer;
            }

            .room:hover {
              box-shadow: 0px 0px 5px 5px #efefef;
            }

            h3,
            h4 {
              margin-bottom: 5px;
            }

            .readMore {
              display: flex;
              justify-content: flex-end;
              align-items: end;
            }

            .gallery {
              height: 322px;
              border-radius: 8px;
              position: relative;
            }

            .content {
              flex: 1;
              padding: 10px;
              display: flex;
              flex-direction: column;
            }

            .description {
              flex: 1;
            }

            .tags {
              margin-bottom: 10px;
            }

            .split {
              display: grid;
              grid-template-columns: 2fr 1fr;
              gap: 10px;
            }

            @media only screen and (min-width: 992px) {
              .room {
                width: calc(50% - 40px);
              }
            }
          `}
        </style>
      </a>
    </Link>
  );
};

const RoomSection = ({ room }) => {
  return (
    <div>
      <h2>Rom</h2>
      <div className="container">
        {room.map((x, i) => {
          return (
            <>
              <Room key={i} {...x.room_id} />
            </>
          );
        })}
      </div>
      <style jsx>
        {`
          .container {
            width: 100%;
            height: 100%;
            display: flex;
            gap: 40px;
            flex-direction: row;
            flex-wrap: wrap;
          }
        `}
      </style>
    </div>
  );
};

export default RoomSection;
