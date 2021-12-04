import { BlurImage, OpeningHours } from "dak-components";
import fetchIndexData from "../lib";
import fetchLayoutData from "../lib/layout";
import Link from "next/link";
import { Title } from "dak-components";
import { Carousel } from "../components/Carousel";

export async function getStaticProps(context) {
  const layout = await fetchLayoutData(context.locale);
  const indexData = await fetchIndexData(context.locale);

  return {
    props: {
      layout: layout,
      data: indexData,
    },
    revalidate: 1,
  };
}

const EventCard = ({ event }) => {
  // Ugly, i don't like this, TODO: Fix
  const hasLink = event?.url;
  const LinkWrapper = hasLink ? Link : ({ children }) => <>{children}</>;

  return (
    <LinkWrapper href={event?.url ?? "/"}>
      <div className={"container" + (hasLink ? " link" : "")}>
        <div className="image">
          <BlurImage
            className="event-image"
            fadeIn
            objectFit="cover"
            layout="fill"
            image={event.image}
          />
        </div>
        <div className="content">
          <div className="tags">{event.tags.join(" | ")}</div>
          <h1 className="title">{event.title}</h1>
          <div className="description">{event.description}</div>
        </div>

        <style jsx global>
          {`
            .event-image {
              border-radius: 5px;
              transition: 200ms;
            }

            .link:hover .event-image {
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }
          `}
        </style>
        <style jsx>
          {`
            .container {
              width: 100%;
              transition: 100ms;
              padding: 0px;
              margin: 10px;
              border-radius: 5px;
              cursor: unset;
            }

            .link {
              cursor: pointer;
              transition: 200ms;
            }
            .link:hover {
              box-shadow: 0px 0px 32px 0px #d1d1d1;
            }

            .image {
              height: 217px;
              width: 100%;
              position: relative;
              margin-bottom: 5px;
            }

            .content {
              margin: 7px;
            }
            .tags {
              font-size: 12px;
              font-weight: 300;
              text-transform: uppercase;
            }

            .title {
              margin-top: 3px;
              font-size: max(16px, calc(26px - ${event?.title.length / 5}px));
              margin-bottom: 1px;
            }

            .description {
              font-size: 14px;
              font-weight: 300;
            }

            @media only screen and (min-width: 768px) {
              .container {
                width: calc(50% - 20px);
              }
            }

            @media only screen and (min-width: 992px) {
              .container {
                width: calc(33.333333% - 20px);
              }
            }
          `}
        </style>
      </div>
    </LinkWrapper>
  );
};

const EventList = ({ events }) => {
  return (
    <div className="container">
      <div className="content">
        {events.map((x, i) => (
          <EventCard key={i} event={x} />
        ))}
      </div>
      <style jsx>{`
        .container {
          margin: 10px 0;
        }
        .content {
          width: 100%;
          min-height: 200px;
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
        }
      `}</style>
    </div>
  );
};

const TodayItem = ({ event }) => {
  return (
    <div className="container">
      <div className="time">
        {event.startTime} - {event.endTime}
      </div>
      <div className="room">{event.room}</div>
      <div className="title">{event.title}</div>

      <style jsx>
        {`
        .container {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 5px;
          }
        .time {
          width: 125px;
        }

        .room {
          width: 200px;
        }

        .title {
          flex: 1;
        }

        

        @media (max-width: 768px) {
            .time,
            .room {
              width: 50%;
            }
            .room {
              display: flex;
              justify-content: flex-end;
            }
          }
        `}
      </style>
    </div>
  );
};

export default function Index({ data }) {
  return (
    <div className="container">
      <Carousel carouselItems={data.carouselItems} />

      <div className="content">
        <div className="happening-today">
          <Title underlined>Dette skjer i dag</Title>
          {data.eventsToday.map((x, i) => (
            <TodayItem key={i} event={x} />
          ))}
        </div>
        <div className="opening-hours">
          <Title underlined>Åpningstider</Title>
          <OpeningHours openingHours={data.openingHours} />
        </div>
        <div className="events">
          <Title underlined big>
            Hva skjer fremover?
          </Title>
          <EventList events={data.events} />
        </div>
      </div>
      <style jsx>
        {`
          .container {
          }


          .content {
            max-width: 1300px;
            margin: auto;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
            margin: auto;
            padding: 20px;
          }

          .happening-today {
            width: calc(65% - 20px / 2); // 20px / 2 bcs of gap
            min-height: 50px;
          }

          .opening-hours {
            width: calc(35% - 20px / 2); // 20px / 2 bcs of gap
            min-height: 50px;
          }

          @media (max-width: 768px) {
            .happening-today,
            .opening-hours {
              width: 100%;
            }
          }

          .events {
            width: 100%;
          }
        `}
      </style>
    </div>
  );
}
