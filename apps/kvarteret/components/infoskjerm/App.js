import React, { Component } from "react";
import Axios from "axios";
import "./App.module.css";
import {
  getEventsAtFloor,
  generateEventCards,
  filterPastEvents,
} from "./utils";
import { returnDummyData } from "./dummyData";
import FloorContainer from "./FloorContainer";
import Header from "./Header";

class App extends Component {
  constructor() {
    super();
    this.state = {
      eventData: null,
      onPause: false,
    };
  }
  useDummyData = true;

  /**
   * The interval fetching the data of this function is paused when the time hits 23:55, and restarts 03:00
   * This is to keep previous day events visible on the screen. At 00:00 the servers serves new data for the new day,
   * this will be visible at 03:00 until 03:00.
   */
  componentDidMount() {
    if (this.useDummyData) {
      this.interval = setInterval(() => {
        this.setState({ eventData: filterPastEvents(returnDummyData()) });
      }, 5000);
    } else {
      fetchAndSetEventData();
      this.interval = setInterval(() => {
        if (this.state.onPause === false) {
          fetchAndSetEventData();
        }
      }, 30 * 1000);
    }
  }

  fetchAndSetEventData() {
    Axios.get("https://kvarteret.no/info/fetchxml.php")
      .then((res) => {
        this.setState({ eventData: "" }, () => {
          this.setState({ eventData: filterPastEvents(res.data) });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div id="MainContainer">
        <div>
          <div>
            <Header />
          </div>
        </div>
        {!this.state.eventData ? (
          <h1>Loading...</h1>
        ) : (
          <div id="Floors">
            <div>
              <FloorContainer
                floor={3}
                eventCards={generateEventCards(
                  getEventsAtFloor(this.state.eventData, 3)
                )}
              />
            </div>
            <div>
              <FloorContainer
                floor={2}
                eventCards={generateEventCards(
                  getEventsAtFloor(this.state.eventData, 2)
                )}
              />
            </div>
            <div>
              <FloorContainer
                floor={1}
                eventCards={generateEventCards(
                  getEventsAtFloor(this.state.eventData, 1)
                )}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
