const TodayItem = ({ event }) => {
    return (
      <div className="container">
        <div className="time">
          {event.startTime} - {event.endTime}
        </div>
        <div className="room">{event.room}</div>
        <div className="title">{event.title}</div>
  
        <style jsx>
          {`
          .container {
              display: flex;
              flex-wrap: wrap;
              margin-top: 10px;
            }
          .time {
            width: 125px;
          }
  
          .room {
            width: 200px;
          }
  
          .title {
            flex: 1;
          }
  
          
  
          @media (max-width: 768px) {
              .time,
              .room {
                width: 50%;
              }
              .room {
                display: flex;
                justify-content: flex-end;
              }
            }
          `}
        </style>
      </div>
    );
  };

export {TodayItem}