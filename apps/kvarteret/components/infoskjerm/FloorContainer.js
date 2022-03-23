import React, { Component } from "react";

export default class FloorContainer extends Component {
  render() {
    return (
      <div className="CardFloorContainer">
        <div className="CardFloorHeader">
          <h2 id="etgH">{this.props.floor}. etasje</h2>
        </div>
        {this.props.eventCards}
        <style jsx>{`
          h2 {
            margin: 0;
            text-transform: uppercase;
            font-size: 2em;
          }
          .CardFloorContainer {
            display: flex;
            flex-direction: column;
            margin: 5px;
            padding: 5px;
            position: relative;
          }

          .CardFloorHeader {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 2px;
          }

          #etgH {
            color: #fddbdb;
            margin-left: 27px;
            margin-bottom: 10px;
            font-size: 2em;
            font-weight: 100;
          }
        `}</style>
      </div>
    );
  }
}
