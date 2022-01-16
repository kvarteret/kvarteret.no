import getNavigation from "./navigation";
import queryGeneralInformation, { queryOpeningHours } from "./queries/generalInformation"
import appendBase64Image from "./utils/appendBase64Image";
// import { getPlaiceholder } from "plaiceholder";

const fetchLayoutData = async (lang) => {
    const generalData = await appendBase64Image(await queryGeneralInformation(lang));
    const navigation = await getNavigation(lang);
    let openingHours = await queryOpeningHours();

    if(process.env.NO_PATH) {
        openingHours = []
    }
    return {
        scripts: generalData.general_information.scripts ?? [],
        hoved_logo: generalData.general_information.hoved_logo,
        logo: generalData.general_information.logo,
        socialMedia: generalData.general_information.social_media,
        navigation: navigation,
        openingHours: openingHours
    }
}

export default fetchLayoutData;