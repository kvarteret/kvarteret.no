import React, { Component } from "react";
import Image from "next/image";
import "./Header.module.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="header">
        <Image
          id="logo"
          src="/logo.png"
          alt="Kvarteret logo"
          width="100%"
          height="100%"
        />
        <h2 id="title">
          Dette skjer <br></br>i dag
        </h2>
      </div>
    );
  }
}

export default Header;
