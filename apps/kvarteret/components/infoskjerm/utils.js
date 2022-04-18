import React from "react";

var etasje1 = [
  "Grøndahls Flygel- og Pianolager",
  "Eldorado",
  "Teglverket",
  "Grønndahls",
  "Tivoli",
  "Tivoli + Eldorado",
];
var etasje2 = [
  "Stjernesalen",
  "Maos Lille Røde",
  "Speilsalen",
  "Lobbyen",
  "Bakgården",
];
var etasje3 = ["Troferommet", "Storelogen", "Støy", "Stillhet", "Halvtimen"];

/**
 * Takes room name and returns which floor event is in.
 *
 */
export function getFloorNumber(roomName, floor) {
  if (etasje1.indexOf(roomName) >= 0) {
    return 1;
  }
  if (etasje2.indexOf(roomName) >= 0) {
    return 2;
  }
  if (etasje3.indexOf(roomName) >= 0) {
    return 3;
  }

  return floor;
}

/**
 * Takes a list with events, and returns events for today.
 *
 */
export function getCurrentEvents(events) {
  // Events are already filtered using filterPastEvents function
  var currentEvents = [];
  var dateToday = getDate();

  var dateTime3HoursAgo = new Date();
  dateTime3HoursAgo.setHours(dateTime3HoursAgo.getHours() - 3);

  var date3HoursAgo = getDate(dateTime3HoursAgo);
  for (var i = 0; i < events.length; i++) {
    if (events[i]["dato"] == dateToday) {
      currentEvents.push(events[i]);
    } else if (events[i]["dato"] == date3HoursAgo) {
      // If event started yesterday
      // Then show them
      currentEvents.push(events[i]);
    }
  }
  return currentEvents;
}

/**
 * Get events for today, at inFloor
 * Example: Get events at 2nd floor -> getEventsAtFloor(events,2)
 */

 export function getEventsAtFloor(events, inFloor) {

  var eventsAtFloor = [];
  var currentEvents = /*getCurrentEvents(events)*/ events;
  for (const event of currentEvents) {
    for(const room of event.rooms) {
      let roomNr = getFloorNumber(room.name, inFloor);
      if (roomNr == inFloor) {
        eventsAtFloor.push({
          room: room.name,
          name: event.name,
          start: room.start,
          end: room.end
        });
      }
    }

    if(event.rooms.length == 0) {
        eventsAtFloor.push({
          name: event.name,
          start: event.start,
          end: event.end
        });
    }
  }

  return eventsAtFloor;
}


/**
 * Removes events that has finished if they are finished before 00:00:00.
 * All events that finished between 00:00:00 and 03:00:00 at night will be kept
 * @param { all the events } events
 */
export function filterPastEvents(events) {
  const now = new Date();
  var filteredEvents = events.filter((e) => {
    if (new Date(e.end) >= now) {
      return true;
    }
  }).sort((a, b) => new Date(a.start) - new Date(b.start));
  return filteredEvents;
}

/**
 * Returns the current date
 */
export function getDate(date) {
  var currentdate = date ? date : new Date();
  var year = currentdate.getFullYear();
  var month = currentdate.getMonth() + 1;
  var day = currentdate.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  return year + "-" + month + "-" + day;
}

/**
 * Returns the current time
 */
export function getTime() {
  var today = new Date();
  var hours = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  return hours + ":" + min + ":" + sec;
}
