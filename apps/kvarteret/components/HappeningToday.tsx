import { TodayItem } from "../components/TodayItem";
import { Title } from "dak-components";
import TranslatedField, {
  useTranslation,
} from "dak-components/lib/components/TranslatedField";
import { Event } from "dak-components/lib/cms/queries/events";

const HappeningToday = ({ events }: { events: Event[] }) => {
  return (
    <div className="happening-today">
      <Title underlined>
        <TranslatedField tKey="index-happening-today" />
      </Title>
      <div className="happening-today-content">
        <TodayItem
          bold
          event={{
            time: useTranslation("time"),
            room: useTranslation("room"),
            title: useTranslation("event"),
          }}
        />
        {events.map((x, i) => (
          <TodayItem key={i} event={x} />
        ))}
      </div>
      {events.length <= 0 && (
        <div className="nothing-happening">
          <TranslatedField tKey="index-nothing-happening-today" />
        </div>
      )}
    </div>
  );
};

export default HappeningToday;
