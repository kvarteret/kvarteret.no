import { EventCard } from "./EventCard";

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
            gap: 20px;
            flex-wrap: wrap;
            flex-direction: row;
          }
        `}</style>
      </div>
    );
  };

  export {EventList}