import React from "react";
import Styles from "./OpeningHours.module.css";
import type { OpeningTime } from "../utils/queryGeneralInformation";

interface OpeningHoursProps {
  openingTimes: OpeningTime[];
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ openingTimes }) => {
  return (
    <div className={Styles.openingHours}>
      <div className={Styles.gridContainer}>
        {openingTimes.map((openingTime) => (
          <div key={openingTime.id} className={Styles.gridItem}>
            <h3>{openingTime.day}</h3>
            <ul>
              {openingTime.opening_time_day.map((openingTimeDay) => (
                <li key={openingTimeDay.id}>
                  {openingTimeDay.is_open ? (
                    <>
                      <span>{openingTimeDay.opening_time}</span> -{" "}
                      <span>{openingTimeDay.closing_time}</span>
                    </>
                  ) : (
                    <span>Closed </span>
                  )}
                  <span> {openingTimeDay.room.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpeningHours;
