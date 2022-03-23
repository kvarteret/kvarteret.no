import React, { Component } from "react";

export default class FloorContainer extends Component {
  render() {
    return (
      <div className="CardFloorContainer">
        <div className="CardFloorHeader">
          <h2 id="etgH">{this.props.floor}. etasje</h2>
        </div>
        {this.props.eventCards}
      </div>
    );
  }
}
