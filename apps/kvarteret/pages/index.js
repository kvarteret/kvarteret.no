import {  ExternalContent, OpeningHours } from "dak-components";
import fetchIndexData from "../lib";
import fetchLayoutData from "../lib/layout";
import { Title } from "dak-components";
import { Carousel } from "../components/Carousel";
import { EventList } from "../components/EventList";
import { TodayItem } from "../components/TodayItem";
import { NextSeo } from "next-seo";
import Link from 'next/link'

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
      <div className="today">
            <ExternalContent html={data.todayText} />
        </div>
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
          <Link href="events">
            <a className="more-events">Se flere arrangementer</a>
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          .container {
          }

          .more-events {
            margin: auto;
            width: 300px;
            height: 60px;
            background-color: var(--primary-color);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            cursor: pointer;
          }

          .more-events:hover {
            opacity: 0.7;
          }

          .today {
            max-width: 1080px;
            width: 100%;
            margin: auto;
            padding: 20px;
          }

          .content {
            max-width: 1080px;
            width: 100%;
            margin: auto;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
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
