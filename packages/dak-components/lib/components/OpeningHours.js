import {getDay} from 'date-fns';

// Maps name to day id in date-fns https://date-fns.org/v2.28.0/docs/getDay
const dayMapping = {
    søndag: 0,
    mandag: 1,
    tirsdag: 2,
    onsdag: 3,
    torsdag: 4,
    fredag: 5,
    lørdag: 6
}

const filterTodayPred = x=>{
    return dayMapping[x.day] == getDay(new Date());
};


const OpeningHoursRoomName = ({item}) => (<div className="container">
    {item?.room?.name}
    <style jsx>
        {`
        .container {
            font-weight: 500;
        }
        `}
    </style>
</div>)

const OpeningHoursTimes = ({item}) => <div className="container">
    {!item.is_open && <div>CLOSED</div>}
    {item.is_open && 
        <div>{item.opening_time} - {item.closing_time}</div>
    }

    <style jsx>
    {`
    
    .container {
        text-align: right;
    }
    `}
    </style>
</div>

const OpeningHours = ({openingHours, light}) => <div className={"container" + (light ? " light" : "")}>
    <div className="list left">
        {openingHours?.find(filterTodayPred)?.opening_time_day.map((x, i) => <OpeningHoursRoomName key={i} item={x} />)}
    </div>
    <div className="list">
        {openingHours?.find(filterTodayPred)?.opening_time_day.map((x, i) => <OpeningHoursTimes key={i} item={x} />)}
    </div>
    
    <style jsx>
        {`
        .container {
            margin: 10px 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .light .left {
            color: #929292;
        }
        .light {
            color: white;
        }
        .list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        `}
    </style>
</div>

export {OpeningHours};