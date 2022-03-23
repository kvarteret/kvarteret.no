import React, { Component } from "react";
// import fetchIndexData from "dak-components/lib/cms/index";
import {
  getEventsAtFloor,
  generateEventCards,
  filterPastEvents,
} from "./utils";
import { returnDummyData } from "./dummyData";
import FloorContainer from "./FloorContainer";
import Header from "./Header";

export async function getStaticProps(context) {
  return {
    props: {
      locale: context.locale,
    },
    revalidate: 1,
  };
}

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

  async fetchAndSetEventData() {
    console.debug("Fetching events");
    // const indexData = await fetchIndexData(this.props.locale);
    // this.setState({ eventData: filterPastEvents(indexData.events) });
    // Axios.get("https://kvarteret.no/info/fetchxml.php")
    //   .then((res) => {
    //     this.setState({ eventData: "" }, () => {
    //       this.setState({ eventData: filterPastEvents(res.data) });
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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

        <style jsx>{`
          #title {
            padding-top: 45px;
            height: 275px;
            position: absolute;
            left: 100px;
            color: #fddbdb;
            text-align: left;
            font-weight: 100;
            font-size: 6em;
            width: 400px;
          }

          #MainContainer {
            width: 100%;
            height: 100vh;

            background-color: #282835;
            font-family: "Hegval Display", sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
          }

          #Floors {
            display: flex;
            flex-direction: column;
            width: 100%;
            flex-grow: 1;
            justify-content: space-around;
          }
        `}</style>
      </div>
    );
  }
}

export default App;
