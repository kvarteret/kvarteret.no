import React, { Component } from "react";

export default class EventCard extends Component {
  render() {
    return (
      <div className="CardContainer">
        <div className="CardContent">
          <div className="Left">
            <span id="leftValue2">{this.props.sted}</span>
          </div>
          <div className="Middle">{this.props.event}</div>
          <div className="Right">{this.props.tid}</div>
        </div>
        <style jsx>{`
          .CardContainer {
            width: 98%;
            margin: auto;
            color: #fddbdb;
            margin-bottom: 2vh;
            font-size: 20px;
            line-height: 1.5;
            flex-direction: column;
            position: relative;
          }

          .CardFloorFooter {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 2px;
            position: absolute;
            bottom: 0;
            left: 5px;
            right: 5px;
          }

          .CardContent {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;

            padding-top: 10px;
            padding-bottom: 10px;
            align-items: center;
            word-wrap: break-word;
          }

          #leftValue1 {
            font-style: oblique;
          }

          #leftValue2 {
            font-weight: bold;
            color: #fddbdb;
            text-align: left;
            width: 220px !important;
          }

          .CardContent .Left {
            flex-direction: column;
            display: flex;
            justify-content: space-around;
            position: relative;
            left: 20px;
            flex-basis: 25%;
            font-size: 1.2em;
          }

          .CardContent .Middle {
            flex-basis: 50%;
            padding-left: 20px;
            margin-top: auto;
            margin-bottom: auto;
            text-align: left;
            font-size: 1em;
            font-size: 15px !important;
          }
          .CardContent .Right {
            display: flex;
            text-align: center;
            position: absolute;
            margin-right: 20px;
            right: 0;
            font-size: 1.8em;
          }
        `}</style>
      </div>
    );
  }
}
