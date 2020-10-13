
import React from 'react';
import kvarteretLogo from '../res/images/logo.png'

export default ({lang, slug}) => {
    let noClass = "lang no";
    let enClass = "lang no";
    if(lang.toLowerCase() === "no") {
        noClass += " selected";
    } else {
        enClass += " selected";
    }

    return (
        <div>
            <div id="HeaderBar">
                <div className="hamburger">=</div>
                <div className="divider"></div>
                <div className="search">O</div>
                <div className="bar left">
                    <a href="#">Aktuelt</a>
                    <a href="#">Kafèmeny</a>
                    <a href="#">Butikk</a>
                    <a href={"../" + slug}><span className="selected selected-underline">Rombooking</span></a>
                </div>
                <img className="logo" src={kvarteretLogo}></img>
                <div className="bar right">
                    <a href="#">Bilder</a>
                    <a href="#">Om oss</a>
                    <a href="#">Kontakt</a>
                </div>
                <div className="button">Bli frivillig</div>
                <div className="divider"></div>
                <div className="lang-select">
                    <a href={"/" + slug} className={noClass}>NO</a>
                    <span>|</span>
                    <a href={"/en/" + slug} className={enClass}>EN</a>
                </div>
            </div>
            <div id="HeaderSpacing"></div>
        </div>
    )
}