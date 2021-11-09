import getNavigation from "./navigation";
import queryGeneralInformation, { queryOpeningHours } from "./queries/generalInformation"

const fetchLayoutData = async (lang) => {
    const generalData = await queryGeneralInformation(lang);
    const navigation = await getNavigation(lang);
    const openingTime = await queryOpeningHours();

    return {
        ...generalData.general_information,
        navigation: navigation,
        openingTime: openingTime
    }
}

export default fetchLayoutData;