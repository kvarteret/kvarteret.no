import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BlurImage } from "dak-components";
import TranslatedField from "dak-components/lib/components/TranslatedField";
import Layout from "dak-components/lib/layout/Layout";
import fetchLayoutData from "dak-components/lib/cms/layout";
import { getTranslationsData } from "dak-components/lib/components/TranslatedField";
import { InferGetStaticPropsType } from "next";
import fetchEventData from "path/to/fetchEventData";

type Event = {
  slug: string;
  top_image: string;
  duration: string;
  translations: {
    title: string;
    description: string;
  }[];
};

type HorizontalCardProps = {
  url: string;
  image: string;
  altImage: string;
  title: string;
  description: string;
  time: string;
};

export async function getStaticProps({ locale }) {
  async function search(locale) {
    await axios.get<Event[]>(`/api/events`);
  }
  const layoutData = await fetchLayoutData(locale);
  const eventData = await search(locale); // This is a hypothetical function you would implement
  const translations = await getTranslationsData(locale, [
    "list_of_translation_keys",
  ]);

  return {
    props: {
      layoutData,
      eventData,
      translations,
    },
    revalidate: 60 * 30, // Revalidate every half hour
  };
}

const HorizontalCard = ({
  url,
  image,
  altImage,
  title,
  description,
  time,
}: HorizontalCardProps) => {
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
      <style jsx>
        {`
          .search-event-image {
            border-radius: 5px;
            transition: 20ms;
          }

          #searchContainer:hover {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            transform: scale(1.001);
            transition: all 0.1s;
            box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
              rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
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

type EventCardProps = {
  event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
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
    </div>
  );
};

// Relevant filter: free-text search, room, arrangør, tags
const EventSearch = ({
  layoutData,
  eventData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<Event[]>(eventData || []);

  const doSearch = useCallback(() => {
    const asyncSearch = async () => {
      // FETCHER EVENTS
      const { data } = await axios.get<Event[]>(
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
    <Layout data={layoutData}>
      <div className="wrapper">
        <div className="container">
          <div>
            <h2>
              <TranslatedField tKey="search" />
            </h2>
            <div>
              <input onChange={(e) => setSearch(e.target.value)} />
              <button onClick={() => doSearch()}>Søk</button>
            </div>
          </div>
          <div>
            <h1>
              <TranslatedField tKey="events" />
            </h1>
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
              margin-top: 20px;
              max-width: 1080px;
              width: 100%;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

export default EventSearch;
