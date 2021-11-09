import queryGeneralInformation from "./queries/generalInformation";
import queryNavigationData from "./queries/navigation";

const MAX_DEPTH = 5;

const constructTree = (id, navigationItems, depth = 0) => {

    const result = {...navigationItems.find(x=>x.id == id)};
    if(!result) return result; // No element found for id, return empty

    // Flesh out every child until stop condition
    if(depth <= MAX_DEPTH) {
        result.children = result.children.map(x=> constructTree(x.id, navigationItems, depth + 1));
    }

    return result;
}

const getNavigation = async (lang) => {
    const generalInformation = await queryGeneralInformation(lang);
    const data = await queryNavigationData(lang);
    const navigationItems = data.navigation_item;
    return {
        left: generalInformation.general_information.left_navigation.map(x=>constructTree(x.id, navigationItems)),
        right: generalInformation.general_information.right_navigation.map(x=>constructTree(x.id, navigationItems))
    }
}

export default getNavigation;