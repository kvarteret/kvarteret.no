import { Cards, Avatars } from "dak-components"


const CardSection = ({layout, title, cards}) => {
    let Component = Cards;
    let cardsPrRow = 2
    if(layout === "AVATAR") {
        Component = Avatars;
        cardsPrRow = 4
    }   

    let fillMode = "cover";
    if(layout === "CARDS_CONTAIN") { 
        fillMode="contain"
    }

    return <div>
        {title && <h2>{title}</h2>}

        <Component fillMode={fillMode} cards={cards} cardsPrRow={cardsPrRow} />
    </div>
}

export default CardSection;