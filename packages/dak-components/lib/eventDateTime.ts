import { format, parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

export const EVENT_TIME_ZONE = "Europe/Oslo";

export const parseEventDateTime = (value: Date | string) => {
  if (value instanceof Date) {
    return new Date(value);
  }

  const normalizedValue = value.includes(" ") ? value.replace(" ", "T") : value;
  return parseISO(normalizedValue);
};

export const mergeDateWithEventTime = (date: Date, timeSource: Date) => {
  const zonedDate = utcToZonedTime(date, EVENT_TIME_ZONE);
  const zonedTime = utcToZonedTime(timeSource, EVENT_TIME_ZONE);

  return zonedTimeToUtc(
    new Date(
      zonedDate.getFullYear(),
      zonedDate.getMonth(),
      zonedDate.getDate(),
      zonedTime.getHours(),
      zonedTime.getMinutes(),
      zonedTime.getSeconds(),
      zonedTime.getMilliseconds()
    ),
    EVENT_TIME_ZONE
  );
};

export const formatEventCalendarDate = (value: Date | string) => {
  return format(utcToZonedTime(parseEventDateTime(value), EVENT_TIME_ZONE), "yyyy-MM-dd");
};
