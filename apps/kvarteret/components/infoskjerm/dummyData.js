export function returnDummyData() {
  return [
    {
      name: "Kongen",
      id: 0,
      event_type_id: 141,
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      rooms: [{
        name: "Storelogen",
        id: 95,
        title: "Kongen Storelogen",
        start: new Date().toISOString(),
        end: new Date().toISOString(),
      }],
    },
    {
      id: 20963,
      name: "Immaturus - Hovedproduksjon 1",
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      event_type_id: 133,
      rooms: [
        {
          name: "Tivoli",
          id: 95,
          title: "Tivoli: Hovedproduksjon 1 Immaturus",
          start: new Date().toISOString(),
          end: new Date().toISOString(),
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
