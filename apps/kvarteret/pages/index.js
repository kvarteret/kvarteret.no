import { OpeningHours } from "dak-components";
import fetchIndexData from "../lib";
import fetchLayoutData from "../lib/layout";
import { Title } from "dak-components";
import { Carousel } from "../components/Carousel";
import { EventList } from "../components/EventList";
import { TodayItem } from "../components/TodayItem";
import { NextSeo } from "next-seo";

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


export default function Index({ data }) {
  return (
    <div className="container">
      {/* TODO: Fetch from cms and make language dependent */}
      <NextSeo
      titleTemplate="%s | Kvarteret.no"
        defaultTitle="Det Akademiske Kvarter"
        description={"Studentenes kulturhus i Bergen"}
      
      />
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
