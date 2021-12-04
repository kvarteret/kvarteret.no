import { queryIndexEvents } from "./queries/events";
import { queryCarouselItems, queryOpeningHours } from "./queries/generalInformation"


const fetchIndexData = async (lang) => {
    const events = await queryIndexEvents(lang, new Date()); // Filter on current time
    const openingHours = await queryOpeningHours();
    const carouselItems = await queryCarouselItems(lang);
    const result = {events, openingHours, carouselItems};

    return result;
}

export default fetchIndexData;