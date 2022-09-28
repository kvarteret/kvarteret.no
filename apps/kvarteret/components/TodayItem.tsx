import { Event } from "dak-components/lib/cms/queries/events";
import { CrescatEvent } from "dak-components/lib/crescat";

const TodayItem = ({ event, bold = false }: { event: { time: String; room: String; title: String; }; bold?: boolean }) => {
  return (
    <>
      <div className="time">{event.time}</div>
      <div className="room">{event.room}</div>
      <div className="title">{event.title}</div>

      <style jsx>
        {`
          .time,
          .room,
          .title {
            font-weight: ${bold ? "700" : "300"};
            margin: 5px;
          }

          @media (max-width: 768px) {
            .title {
              margin-bottom: 10px;
            }
            
          }
        `}
      </style>
    </>
  );
};

export { TodayItem };
