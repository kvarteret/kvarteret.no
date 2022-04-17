import { addDays, addHours, subHours } from "date-fns";

export function returnDummyData() {
  return [
    {
      id: 30256,
      name: "PÅSKE",
      start: "2022-04-11 00:00:00",
      end: "2022-04-18 23:59:00",
      event_type_id: 141,
      rooms: [],
      show_times: [],
    },
    {
      name: "Kongen",
      id: 0,
      event_type_id: 141,
      start: subHours(new Date(), 1).toISOString(),
      end: addDays(new Date(), 1).toISOString(),
      rooms: [
        {
          name: "Storelogen",
          id: 95,
          title: "Kongen Storelogen",
          start: subHours(new Date(), 1).toISOString(),
          end: addDays(new Date(), 1).toISOString(),
        },
      ],
    },
    {
      id: 20963,
      name: "Immaturus - Hovedproduksjon 1",
      start: addHours(new Date(), 1).toISOString(),
      end: addHours(new Date(), 2).toISOString(),
      event_type_id: 133,
      rooms: [
        {
          name: "Tivoli",
          id: 95,
          title: "Tivoli: Hovedproduksjon 1 Immaturus",
          start: addHours(new Date(), 1).toISOString(),
          end: addHours(new Date(), 2).toISOString(),
        },
      ],
      show_times: [],
      fields: [
        {
          value: null,
          show_time_id: null,
          id: 70879,
        },
        {
          value: null,
          show_time_id: null,
          id: 70876,
        },
        {
          value: null,
          show_time_id: null,
          id: 70877,
        },
        {
          value: null,
          show_time_id: null,
          id: 70878,
        },
      ],
    },
  ];
}
