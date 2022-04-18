import { Cards, Avatars } from "dak-components"


const CardSection = ({layout, title, cards}) => {
    let Component = Cards;
    let cardsPrRow = 2
    if(layout === "AVATAR") {
        Component = Avatars;
        cardsPrRow = 4
    }
    return <div>
        {title && <h2>{title}</h2>}

        <Component cards={cards} cardsPrRow={cardsPrRow} />
    </div>
}

export default CardSection;