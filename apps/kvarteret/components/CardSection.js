import { Cards } from "dak-components"

const CardSection = ({title, cards}) => {
    return <div>
        {title && <h2>{title}</h2>}

        <Cards cards={cards} cardsPrRow={2} />
    </div>
}

export default CardSection;