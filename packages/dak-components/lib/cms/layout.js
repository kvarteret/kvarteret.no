import getNavigation from "./navigation";
import queryGeneralInformation, {
  queryOpeningHours,
} from "./queries/generalInformation";
import appendBase64Image from "./utils/appendBase64Image.ts";

const fetchLayoutData = async (lang) => {
  let {general_information: generalData, navigation: navigationItems} = await queryGeneralInformation(lang);
  const navigation = getNavigation(generalData, navigationItems);
  const openingHours = await queryOpeningHours();

  generalData = await appendBase64Image(generalData);

  if (process.env.NO_PATH) {
    openingHours = [];
  }
  return {
    scripts: generalData.scripts ?? [],
    hoved_logo: generalData.hoved_logo,
    logo: generalData.logo,
    socialMedia: generalData.social_media,
    navigation: navigation,
    openingHours: openingHours,
  };
};

export default fetchLayoutData;
