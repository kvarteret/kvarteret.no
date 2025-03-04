const sanitizeMultiMenu = (item) => {
  return {
    groups: item.navigation_items.map((x) => sanitizeNavigationItem(x)),
    title: item.translations[0]?.title ?? null,
  };
};

const sanitizeNavigationItem = (item) => ({
  title: item?.translations[0]?.name ?? null,
  url:
    (item?.type === "page" ? "/" + (item?.page_2?.slug || "#") : item?.url) ??
    "",
});

const sanitizeTree = (id, navigationItems, depth = 0) => {
  const root = navigationItems.find((x) => x.id == id);
  // Something wrong, return empty
  if (!root) return null;

  return {
    isButton: root.is_button,
    ...sanitizeNavigationItem(root.navigation_item),
    multiMenu: root.muti_menu_dropdown.map((y) => sanitizeMultiMenu(y)),
  };
};

const getNavigation = (generalInformation, navigationItems) => {
  if (process.env.NO_PATH) return { left: [], right: [] };
  return {
    left: generalInformation.left_navigation.map((x) =>
      sanitizeTree(x.id, navigationItems)
    ),
    right: generalInformation.right_navigation.map((x) =>
      sanitizeTree(x.id, navigationItems)
    ),
  };
};

export default getNavigation;
