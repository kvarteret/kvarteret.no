import React from 'react';

import './mainContent.scss'

const MainContent = ({content}) => {
    return (
        <div className="flex">
            <div className="welcome-text">
                <p>
                    <h4>I Dag på Kvarteret</h4>
                    Velkommen tilbake til Kvarteret! Lorem Ipsum dolor sit amet.
                </p>
            </div>
            <div className="opening-hours">
                <h4>Åpningstider i dag</h4>
                <div className="room-hours">
                    <span className="room">Stjernesalen</span>
                    <span className="time">11:30-00:30</span>
                </div>
                <div className="room-hours">
                    <span className="room">Grøndahls</span>
                    <span className="time">20:00-00:30</span>
                </div>
            </div>
        </div>
    );
}

export default MainContent;