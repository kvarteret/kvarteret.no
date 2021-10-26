/**
 * @typedef {Object} CrescatEvent
 * @property {string} name
 * @property {Date} start
 * @property {Date} end
 * @property {number | null} event_type_id
 * @property {CrescatRoom[]} rooms
 * @property {any[]} show_times
 * @property {CrescatField[]} fields
 */

/**
 * @typedef {Object} CrescatField
 * @property {number} id
 * @property {any | null} value
 */

/**
 * @typedef {Object} CrescatRoom
 * @property {string} name
 * @property {number} id
 * @property {string | null} title
 * @property {Date} start
 * @property {Date} end
 */

/**
 * @typedef {Object} DirectusEvent
 * @property {string} id  Not in use in converter
 * @property {string} internal_name
 * @property {string} crescat_id Not available from Crescat
 * @property {string} status Not in use in converter
 * @property {string | null} ticket_url Not available from Crescat
 * @property {string | null} facebook_url Not available from Crescat
 * @property {Date} event_start
 * @property {Date} event_end
 * @property {Translation[]} translations Not available from Crescat
 * @property {EventRoom[]} event_room
 */

/**
 * @typedef {Object} EventRoom
 * @property {RoomID} room_id
 */

/**
 * @typedef {Object} RoomID
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} Translation
 * @property {string} title
 * @property {string} description
 */
