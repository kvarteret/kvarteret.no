/**
 * Convert a list of crescatEvents to the desired DirectusEvent format
 * @param {CrescatEvent[]} crescatEvents
 * @returns {DirectusEvent[]}
 */
function convertCrescatEventsToDirectusEvents(crescatEvents) {
  /** @type {DirectusEvent[]} */
  const out = []

  for (const crescatEvent of crescatEvents) {
    /**
     * @type {DirectusEvent}
     */
    const directusEvent = {
      internal_name: crescatEvent.name,
      event_start: crescatEvent.start,
      event_end: crescatEvent.end,
      event_room: convertCrescatRoomsToDirectusRooms(crescatEvent.rooms),
    }

    out.push(directusEvent)
  }

  return out
}

/**
 *
 * @param {CrescatRoom[]} crescatRooms
 * @returns {EventRoom[]}
 */
function convertCrescatRoomsToDirectusRooms(crescatRooms) {
  /**
   * @type {EventRoom[]}
   */
  const out = []

  for (const crescatRoom of crescatRooms) {
    /**@type {EventRoom} */
    const eventRoom = {
      room_id: {
        id: crescatRoom.id,
        name: crescatRoom.name,
      },
    }
    out.push(eventRoom)
  }

  return out
}

// export default convertCrescatEventsToDirectusEvents

module.exports = convertCrescatEventsToDirectusEvents
