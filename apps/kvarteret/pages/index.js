import { ExternalContent, Link, OpeningHours } from "dak-components";
import fetchIndexData from "dak-components/lib/cms/index";
import fetchLayoutData from "dak-components/lib/cms/layout";
import { Title } from "dak-components";
import { Carousel } from "../components/Carousel";
import { EventList } from "../components/EventList";
import { TodayItem } from "../components/TodayItem";
import { NextSeo } from "next-seo";
import TranslatedField, {
  getTranslationsData,
  useTranslation,
} from "dak-components/lib/components/TranslatedField";

export async function getStaticProps(context) {
  const layout = await fetchLayoutData(context.locale);
  const indexData = await fetchIndexData(context.locale);

  return {
    props: {
      translations: await getTranslationsData(context.locale, [
        "index-happening-today",
        "time",
        "room",
        "event",
        "index-nothing-happening-today",
        "index-coming-events",
        "index-see-more-events",
      ]),
      layout: layout,
      data: indexData,
    },
    revalidate: 60 * 30, // Hver halvtime
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
        <div className="today">
          <ExternalContent html={data.todayText} />
        </div>
        {/*         <div className="happening-today">
          <Title underlined><TranslatedField tKey="index-happening-today" /></Title>
          <div className="happening-today-content">
            <TodayItem
              bold
              event={{
                time: useTranslation("time"),
                room: useTranslation("room"),
                title: useTranslation("event"),
              }}
            />
            {data.eventsToday.map((x, i) => (
              <TodayItem key={i} event={x} />
            ))}
          </div>
          {data.eventsToday.length <= 0 && (
            <div className="nothing-happening">
              <TranslatedField tKey="index-nothing-happening-today" />
            </div>
          )}
        </div> */}
        <div className="opening-hours">
          <Title underlined>
            <TranslatedField tKey="footer-opening-hours" />
          </Title>
          <OpeningHours openingHours={data.openingHours} />
          <Link href="vare-barer">
            <a className="vare-barer"><TranslatedField tKey="footer-opening-hours-description" /></a>
          </Link>
        </div>
        <div className="events">
          <Title underlined big>
            <TranslatedField tKey="index-coming-events" />
          </Title>
          <EventList events={data.events} />
          <Link href="events">
            <a className="more-events"><TranslatedField tKey="index-see-more-events" /></a>
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          .container {
          }

          .happening-today-content {
            gap: 10px;
            display: grid;
            margin-top: 5px;
            grid-template-columns: fit-content(200px) fit-content(200px) 1fr;
          }
          @media (max-width: 768px) {
            .happening-today-content {
              gap: 0;
              display: grid;
              grid-template-columns: 1fr;
              grid-template-rows: repeat(auto-fit, 1fr);
            }
          }

          .nothing-happening {
            margin-top: 10px;
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
            padding: 20px 0;
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
            background-color: white;
            margin: auto;
          }

          .happening-today {
            width: calc(65% - 20px / 2); // 20px / 2 bcs of gap
            min-height: 50px;
          }

          .opening-hours {
            margin: auto;
            width: 100%; /* calc(35% - 20px / 2); // 20px / 2 bcs of gap */
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
