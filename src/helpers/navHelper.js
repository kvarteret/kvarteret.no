import { InsertEmoticon } from '@material-ui/icons'
import { graphql, useStaticQuery } from 'gatsby'
import { isValidStatus } from './helper'
import {
  UrlLanguageCode,
  getTranslation,
  getTranslatedUrl,
} from './languageHelper'

const getData = () => {
  const data = useStaticQuery(graphql`
    query NavBarQuery {
      directus {
        general_information {
          left_navigation {
            id
          }
          right_navigation {
            id
          }
        }
        navigation_item {
          id
          is_button
          children {
            id
          }
          type
          translations {
            name
            languages_code {
              url_code
            }
          }
          link {
            url
          }
          page {
            slug
            status
          }
        }
      }
    }
  `)
  return data
}

const getNavItemsDict = (allNavItems) => {
  let dict = {}
  allNavItems.navigation_item?.forEach((item) => {
    dict[item.id] = item
  })
  return dict
}

const GetNavItems = () => {
  // Fetch data from api
  const data = getData()

  console.log("NAV DATA", data);

  // Split data for navigation parts
  const leftNav = data.directus.general_information.left_navigation
  const rightNav = data.directus.general_information.right_navigation
  // Navigation lookup
  const navItemsDict = getNavItemsDict(data.directus)

  // Recursively iterate navigation to sanitize navigation tree
  const leftNavItems = getNavItems(leftNav, navItemsDict, 0)
  const rightNavItems = getNavItems(rightNav, navItemsDict, 0)
  return { leftNavItems, rightNavItems }
}

const getNavItems = (itemIds, lookupDict, depth) => {
  if (depth > 5) return null
  if (!itemIds) return null

  const items = []
  for (let itemId of itemIds) {
    const item = lookupDict[itemId.id]
    if (!item) continue
    const title = getTranslation(item.translations).name
    const isButton = item.is_button
    let destination = getDestination(item, lookupDict, depth)
    let url = destination ? destination.url : null;

    let children = null
    if (item.children && item.children.length > 0) {
      children = getNavItems(item.children, lookupDict, depth + 1)
    }

    items.push({ title, isButton, url, children })
  }
  return items
}

const getDestination = (item, lookupDict, depth) => {
    const handler = collectionHandlers[item.type]
    if (!handler) throw new Error('Missing handler for type ' + item.type)
    const destination = handler(item[item.type], lookupDict, depth)
    return destination;
}

const LinkItemHandler = (item, navItemsDict, depth) => {
  if(!item) return null;
  return { url: item.url }
}

const PageItemHandler = (item, navItemsDict, depth) => {
  if(!item) return null;
  console.log("ITEM", item);
  if (!isValidStatus(item.status)) return null
  return { url: '/' + getTranslatedUrl(item.slug) }
}

const collectionHandlers = {
  page: PageItemHandler,
  link: LinkItemHandler,
}

const getCarouselLink = (item) => {
  if (item == null) return null
  return collectionHandlers[item.collection](item.item, [], 0)?.url
}
export { GetNavItems, getCarouselLink }
