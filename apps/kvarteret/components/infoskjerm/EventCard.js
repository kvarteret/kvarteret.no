import React, { Component } from "react";
import "./EventCard.module.css";

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
      </div>
    );
  }
}
