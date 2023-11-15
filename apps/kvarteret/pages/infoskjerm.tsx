import { getTranslationsData } from "dak-components/lib/components/TranslatedField";
import { getEvents } from "dak-components/lib/crescat";
import { format } from "date-fns";
import Image from "next/image";
import { returnDummyData } from "../components/infoskjerm/dummyData";
import {
  filterPastEvents,
  getEventsAtFloor,
} from "../components/infoskjerm/utils";
import logo from "../public/static/Kvarteret_logo_rosa.png";

interface EventProps {
  arrangoer: string;
  sted: string;
  event: string;
  tid: string;
}

const Event: React.FC<EventProps> = ({ sted, event, tid }) => (
  <>
    {sted && <div className="room">{sted}</div>}
    <div className="title">{event}</div>
    <div className="time">{tid}</div>
    <style jsx>
      {`
        .title {
          grid-column: ${!sted ? "1/3" : "2"};
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .time {
        }
      `}
    </style>
  </>
);

interface FloorProps {
  name: string;
  events: any[];
}

const Floor: React.FC<FloorProps> = ({ name, events }) => {
  return (
    <div className="container">
      <div className="name">{name}</div>
      <div className="content">
        <div className="eventGrid">
          {events.map((event, index) => {
            const start = new Date(event?.start);
            let tid = format(new Date(start), "HH:mm");
            if (start < new Date()) {
              tid = "PÅGÅR";
            }
            return (
              <Event
                key={index}
                sted={event?.room}
                event={event?.name}
                tid={tid}
              />
            );
          })}
        </div>
      </div>
      <style jsx>
        {`
          .container {
          }
          .eventGrid {
            display: grid;
            gap: 15px;
            grid-template-columns: 150px 1fr 70px;
            color: #fddbdb;
            font-size: 18px;
            font-weight: 100;

            font-weight: 400;
          }
          .content {
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .name {
            color: #fddbdb;
            margin-bottom: 10px;
            font-size: 22px;
            text-transform: uppercase;
            font-weight: 600;
          }
        `}
      </style>
    </div>
  );
};

interface InfoSkjermProps {
  eventData: any[];
}

const InfoSkjerm: React.FC<InfoSkjermProps> = ({ eventData }) => {
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">
          DETTE SKJER <br /> I DAG
        </h1>
        <Image
          className="logo"
          src={logo}
          alt="logo"
          layout="responsive"
          width={185}
          height={185}
        ></Image>
      </div>
      <div className="content">
        {eventData.map(({ floor, events }, index) => (
          <Floor key={index} name={`${floor}. Etasje`} events={events} />
        ))}
      </div>
      <style jsx global>
        {`
          body {
            background-color: #282835;
          }
        `}
      </style>

      <style jsx>
        {`
          .container {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            padding: 0 40px;
            gap: 15px;
          }

          .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 0px;
          }

          .logo {
            height: 185px;
            padding-top: 25px;
          }

          .title {
            margin: 0;
            padding-top: 45px;
            color: #fddbdb;
            text-align: left;
            font-weight: 500;
            font-size: 47px;
            width: 150px;
          }
          .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 30px;
          }
        `}
      </style>
    </div>
  );
};

export async function getStaticProps(context) {
  const crescatData = filterPastEvents(await getEvents());
  // const crescatData = returnDummyData();
  let floorData = [];
  for (let i = 3; i >= 1; --i) {
    floorData.push({
      floor: i,
      events: getEventsAtFloor(crescatData, i),
    });
  }

  return {
    props: {
      translations: await getTranslationsData(context.locale, []),
      eventData: floorData,
    },
    revalidate: 60 * 30, // Hver halvtime
  };
}

export default InfoSkjerm;
