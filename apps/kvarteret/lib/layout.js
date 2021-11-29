import getNavigation from "./navigation";
import queryGeneralInformation, { queryOpeningHours } from "./queries/generalInformation"

const fetchLayoutData = async (lang) => {
    const generalData = await queryGeneralInformation(lang);
    const navigation = await getNavigation(lang);
    let openingHours = await queryOpeningHours();
    
    if(process.env.NO_PATH) {
        openingHours = []
    }
    return {
        hoved_logo: generalData.general_information.hoved_logo,
        logo: generalData.general_information.logo,
        socialMedia: generalData.general_information.social_media,
        navigation: navigation,
        openingHours: openingHours
    }
}

export default fetchLayoutData;