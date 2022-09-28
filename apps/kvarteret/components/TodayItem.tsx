const TodayItem = ({ event, bold }) => {
  return (
    <>
      <div className="time">{event.time}</div>
      <div className="room">{event.room}</div>
      <div className="title">{event.title}</div>

      <style jsx>
        {`
          .time, .room, .title {
          font-weight: ${bold ? "700" : "300"};
          margin: 5px;
          }

          @media (max-width: 768px) {
            .title {
              margin-bottom: 10px;
            }
          }
        `}
      </style>
    </>
  );
};

export { TodayItem };
