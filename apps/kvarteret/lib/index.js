import { queryIndexEvents } from "./queries/events";
import queryGeneralInformation, { queryCarouselItems, queryOpeningHours } from "./queries/generalInformation"


const fetchIndexData = async (lang) => {
    const generalInformation = await queryGeneralInformation(lang);
    const events = await queryIndexEvents(lang, new Date()); // Filter on current time
    const openingHours = await queryOpeningHours();
    const result = {events, openingHours};
    result.carouselItems = await queryCarouselItems(lang);

    return result;
}

export default fetchIndexData;