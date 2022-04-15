import fetchLayoutData from "dak-components/lib/cms/layout";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {BlurImage} from "dak-components"

export async function getStaticProps(context) {
  const layout = await fetchLayoutData(context.locale);

  return {
    props: {
      layout: layout,
    },
    revalidate: 1,
  };
}

const HorizontalCard = ({image, altImage, title, description, time}) => {
  console.log("DA IMAGE", image)
  return <div className="container" id="searchContainer">
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
        .container {
          display: flex;
          flex-direction: row;
          margin-bottom: 15px;
          height: 120px;
          gap: 15px;
          cursor:pointer;
        }

        .image {
          width: 256px;
          border-radius: 5px;
          height: 100%;
          position: relative;
        }

        .info {
          flex: 1;
        }

        .time {
          font-size: 12px;
          font-weight: 300;
          text-transform: uppercase;
        }

        h2, p {
          margin: 0;
        }

      `}
    </style>
  </div>
}

const EventCard = ({event}) => {
  console.log("EVENT", event)
  const title = event.translations[0].title
  const description = event.translations[0].description
  return <div>
    <HorizontalCard 
      image={event.top_image} 
      altImage={title} 
      title={title}
      time={event.event_start}
      description={description}
    />
    {/* {JSON.stringify(event)} */}
  </div>
}

// Relevant filter: free-text search, room, arrangør, tags
const EventSearch = () => {

  const [search, setSearch] = useState("")
  const [events, setEvents] = useState([])

  const doSearch = useCallback(() => {
    const asyncSearch = async () => {
      const {data} = await axios.get(`/api/events?search=${encodeURIComponent(search)}`)
      setEvents(data)
    }
    asyncSearch();
  }, [search])

  useEffect(() => {
    doSearch()
  }, [])

  return (
    <div className="container">
      <h2>Søk</h2>
      <div>
        <input onChange={e => setSearch(e.target.value)} placeholder="Søk etter eventer" />
        <button onClick={() => doSearch()}>Søk</button>
      </div>
      <div>
        <h1>Eventer</h1>
        {events.map((x, i) => <div key={i}>
          <EventCard event={x} />
          </div>)}
      </div>
      <style jsx>
        {`
          .container {
            margin: auto;
            margin-top: 100px;
            max-width: 1080px;
          }
        `}
      </style>
    </div>
  );
};

export default EventSearch;
