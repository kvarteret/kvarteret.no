import React from "react";
import EventCard from "./EventCard";

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
export function getFloorNumber(roomName) {
  if (etasje1.indexOf(roomName) >= 0) {
    return 1;
  }
  if (etasje2.indexOf(roomName) >= 0) {
    return 2;
  }
  if (etasje3.indexOf(roomName) >= 0) {
    return 3;
  }
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
  var currentEvents = getCurrentEvents(events);
  for (var i = 0; i < currentEvents.length; i++) {
    if (getFloorNumber(currentEvents[i]["sted"]) == inFloor) {
      eventsAtFloor.push(currentEvents[i]);
    }
  }
  return eventsAtFloor;
}
/**
 * Returns a list of EventCard components to be rendered
 * @param {*} events All list of events (pass function getEventsAtFloor() if you want a filtered list)
 */
export function generateEventCards(events) {
  let eventCardList = [];

  for (let i = 0; i < events.length; i++) {
    eventCardList.push(
      <EventCard
        key={i}
        arrangoer={events[i]["arrangoernavn"]}
        sted={events[i]["sted"]}
        event={<h2>{events[i]["navn"]}</h2>}
        tid={events[i]["starttid"]}
      />
    );
  }

  return eventCardList;
}

/**
 * Removes events that has finished if they are finished before 00:00:00.
 * All events that finished between 00:00:00 and 03:00:00 at night will be kept
 * @param { all the events } events
 */
export function filterPastEvents(events) {
  var time = getTime();
  var filteredEvents = events.filter((e) => {
    if (e.slutt > time || getDate(new Date(e.dato)) == getDate()) {
      return e;
    } else if (e.slutt >= "00:00:00" && e.slutt <= "03:00:00") {
      return e;
    }
  });
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
