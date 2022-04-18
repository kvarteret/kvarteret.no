import fetchLayoutData from "dak-components/lib/cms/layout";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BlurImage } from "dak-components";

export async function getStaticProps(context) {
  const layout = await fetchLayoutData(context.locale);

  return {
    props: {
      layout: layout,
    },
    revalidate: 1,
  };
}

const HorizontalCard = ({ url, image, altImage, title, description, time }) => {
  return (
    <a href={url} className="container" id="searchContainer">
      <div className="image">
        <BlurImage
          image={image}
          title={altImage}
          alt={altImage}
          className="search-event-image"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="info">
        <h2>{title}</h2>
        <span className="time">{time}</span>
        <p>{description}</p>
      </div>
      <style jsx global>
        {`
          .search-event-image {
            border-radius: 5px;
            transition: 200ms;
          }

          #searchContainer:hover .search-event-image {
            transform: scale(1.02);
          }
        `}
      </style>
      <style jsx>
        {`
        a {
          color: inherit;
        }
          .container {
            display: flex;
            flex-direction: row;
            margin-bottom: 15px;
            height: 160px;
            gap: 15px;
            cursor: pointer;
          }

          .image {
            width: 256px;
            border-radius: 5px;
            height: 100%;
            position: relative;
          }
          @media (max-width: 768px) {
            .container {
              display: flex;
              flex-direction: column;
              height: unset;
              width: 100%;
              gap: 0;
              cursor: pointer;
            }

            .container:hover {
              box-shadow: 0px 0px 32px 0px #d1d1d1;
            }

            .image {
              width: 100%;
              border-radius: 5px;
              height: 223px;
              position: relative;
            }

            .info {
              padding: 10px;
            }
          }

          .info {
            flex: 1;
          }

          .time {
            font-size: 12px;
            font-weight: 300;
            text-transform: uppercase;
          }

          h2,
          p {
            margin: 0;
          }
        `}
      </style>
    </a>
  );
};

const EventCard = ({ event }) => {
  console.log("EVENT", event);
  const title = event.translations[0].title;
  const description = event.translations[0].description;
  return (
    <div>
      <HorizontalCard
        url={`/events/${event?.slug}`}
        image={event.top_image}
        altImage={title}
        title={title}
        time={event.duration}
        description={description}
      />
      {/* {JSON.stringify(event)} */}
    </div>
  );
};

// Relevant filter: free-text search, room, arrangør, tags
const EventSearch = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);

  const doSearch = useCallback(() => {
    const asyncSearch = async () => {
      const { data } = await axios.get(
        `/api/events?search=${encodeURIComponent(search)}`
      );
      setEvents(data);
    };
    asyncSearch();
  }, [search]);

  useEffect(() => {
    doSearch();
  }, []);

  return (
    <div className="wrapper">

    <div className="container">
      <div>
        <h2>Søk</h2>
        <div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Søk etter eventer"
          />
          <button onClick={() => doSearch()}>Søk</button>
        </div>
      </div>
      <div>
        <h1>Eventer</h1>
        {events.map((x, i) => (
          <div key={i}>
            <EventCard event={x} />
          </div>
        ))}
    </div>
      </div>
      <style jsx>
        {`
        .wrapper {

          display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 20px;
        }
          .container {
            margin-top: 100px;
            max-width: 1080px;
            width: 100%;
          }
        `}
      </style>
    </div>
    
  );
};

export default EventSearch;
