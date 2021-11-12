import { queryIndexEvents } from "./queries/events";
import queryGeneralInformation, { queryOpeningHours } from "./queries/generalInformation"


const fetchIndexData = async (lang) => {
    const generalInformation = await queryGeneralInformation(lang);
    const events = await queryIndexEvents(lang, new Date()); // Filter on current time
    const openingHours = await queryOpeningHours();
    const result = {events, openingHours};
    result.carouselItems = generalInformation.general_information.carousel_items;

    return result;
}

export default fetchIndexData;