const crescatToDirectusEvent = require('./crescatToDirectusEvent')

/** @type {CrescatEvent[]} */
const sampleCrescatEvents = [
  {
    name: 'M\u00f8te, SKiBAS',
    start: '2021-10-05 08:30:00',
    end: '2021-10-05 10:30:00',
    event_type_id: null,
    rooms: [
      {
        name: 'Stillhet',
        id: 118,
        title: null,
        start: '2021-10-05 08:30:00',
        end: '2021-10-05 10:30:00',
      },
    ],
    show_times: [],
    fields: [],
  },
  {
    name: 'BFK: Projector Calibration',
    start: '2021-10-05 14:00:00',
    end: '2021-10-05 23:00:00',
    event_type_id: 138,
    rooms: [
      {
        name: 'Tivoli',
        id: 95,
        title: null,
        start: '2021-10-05 14:00:00',
        end: '2021-10-05 23:00:00',
      },
    ],
    show_times: [],
    fields: [
      {
        value: null,
        id: 70879,
      },
      {
        value: null,
        id: 70876,
      },
      {
        value: null,
        id: 70877,
      },
      {
        value: null,
        id: 70878,
      },
    ],
  },
]

/** @type {DirectusEvent[]} */
const expectedCrescatEvents = [
  {
    internal_name: 'Møte, SKiBAS',
    event_start: '2021-10-05 08:30:00',
    event_end: '2021-10-05 10:30:00',
    event_room: [{ room_id: { id: 118, name: 'Stillhet' } }],
  },
  {
    internal_name: 'BFK: Projector Calibration',
    event_start: '2021-10-05 14:00:00',
    event_end: '2021-10-05 23:00:00',
    event_room: [{ room_id: { id: 95, name: 'Tivoli' } }],
  },
]

if (
  JSON.stringify(crescatToDirectusEvent(sampleCrescatEvents)) !=
  JSON.stringify(expectedCrescatEvents)
) {
  throw new Error('crescatToDirectusEvent failed')
} else {
  console.info('crescatToDirectusEvent passed')
}
