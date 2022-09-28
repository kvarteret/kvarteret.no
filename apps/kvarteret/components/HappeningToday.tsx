import { TodayItem } from "../components/TodayItem";
import { Title } from "dak-components";
import TranslatedField, {
  useTranslation,
} from "dak-components/lib/components/TranslatedField";

const HappeningToday = ({ events }: { events: { time: String; room: String; title: String; }[] }) => {
  return (

    /* Creates the element wrapper */
    <div className="happening-today">
      <Title underlined>
        <TranslatedField tKey="index-happening-today" />
      </Title>

      {/* Creates the event elements */}
      <div className="happening-today-content">
        <TodayItem
          bold
          event={{
            time: useTranslation("time"),
            room: useTranslation("room"),
            title: useTranslation("event"),
          }}
        />

        {/* Maps a unique key to the event properties */}
        {events.map((x, i) => (
          <TodayItem key={i} event={x} />
        ))}
      </div>

      {/* Creates different elements if there is no events */}
      {events.length <= 0 && (
        <div className="nothing-happening">
          <TranslatedField tKey="index-nothing-happening-today" />
        </div>
      )}

      {/* CSS for the elements above */}
      <style jsx>
        {`

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
            grid-template-rows: repeat(auto-fit, 1fr);
          }
        }

        .nothing-happening {
          margin-top: 10px;
        }
      
      `}
      </style>
    </div>

  );
};

export default HappeningToday;
