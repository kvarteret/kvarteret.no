import React, { Component } from "react";
import Image from "next/image";

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
          width="300px"
          height="300px"
        />
        <h2 id="title">
          Dette skjer <br></br>i dag
        </h2>
        <style jsx>{`
          .header {
            display: flex;
            position: relative;
            justify-content: center;
            height: 300px;
            background-color: #282835;
            margin-bottom: 20px;
            padding-bottom: 400px;
          }

          #logo {
            /*filter: invert(91%) sepia(3%) saturate(1463%) hue-rotate(314deg) brightness(94%) contrast(112%);*/
            position: absolute;
            right: 100px;
            height: 300px;
            padding-top: 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default Header;
