import { format } from "date-fns";
import Image from "next/image";
import { returnDummyData } from "../components/infoskjerm/dummyData";
import {
  getEventsAtFloor,
} from "../components/infoskjerm/utils";
import logo from '../public/static/Kvarteret_logo_rosa.png'

// Contains imported React code from infoskjerm github repo

export async function getStaticProps(context) {
  // const crescatData = filterPastEvents(await getEvents());
  const crescatData = returnDummyData();
  let floorData = [];
  for (let i = 3; i >= 1; --i) {
    floorData.push({
      floor: i,
      events: getEventsAtFloor(crescatData, i),
    });
  }

  console.log("floorData", JSON.stringify(floorData), crescatData);
  return {
    props: {
      eventData: floorData,
    },
    revalidate: 60,
  };
}

const Event = ({ arrangoer, sted, event, tid }) => (
  <div className="container">
    <div>{event}</div>
    <div>{sted}</div>
    <div className="time">{tid}</div>
    <style jsx>
      {`
        .container {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          color: #FDDBDB;
          font-size: 18px;
          font-weight: 100;

          font-weight: 400;


        }
        .time {
          text-align: right;
        }
      `}
    </style>
  </div>
);

const Floor = ({ name, events }) => {
  return (
    <div className="container">
      <div className="name">{name}</div>
      <div className="content">
        
      {events.length > 0 ? events.map((event, index) => {
        const start = new Date(event?.start)
        let tid = format(new Date(start), "HH:mm")
        if(start < new Date()) {
          tid = "PÅGÅR"
        }
        return (<Event
          key={index}
          sted={event?.sted}
          event={event?.name}
          tid={tid}
        />)
      }) : (<Event event="Ingen arrangementer i dag"/>)}
      </div>
      <style jsx>
        {`
          .container {
            margin-bottom: 30px;
          }
          .content {
            margin-top: 30px;
            display:flex;
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

const InfoSkjerm = ({ eventData }) => {
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">
          DETTE SKJER <br/> I DAG
        </h1>
        <Image
          className="logo"
          src={logo}
          alt="logo"
          layout="raw"
          width={185}
          height={185}
        ></Image>
      </div>
      <div className="content">
        {eventData.map(({ floor, events }, index) => (
          <Floor key={index} name={`${floor}. Etasje`} events={events} />
        ))}
      </div>

      <style jsx>
        {`
          .container {
            background-color: #282835;
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

export default InfoSkjerm;
