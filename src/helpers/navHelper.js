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
          translations {
            name
            languages_code {
              url_code
            }
          }
          destination {
            item {
              ... on DirectusCMS_link {
                url
              }
              ... on DirectusCMS_page {
                status
                slug
              }
            }
            collection
          }
          children {
            id
          }
        }
      }
    }
  `)
  return data
}

const getNavItemsDict = (allNavItems) => {
  let dict = {}
  allNavItems.navigation_item.forEach((item) => {
    dict[item.id] = item
  })
  return dict
}

const GetNavItems = () => {
  // Fetch data from api
  const data = getData()

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
    let destination = getDestination(item.destination, lookupDict, depth)
    let url = null
    if (destination.length >= 1) {
      url = destination[0].url
    }

    let children = null
    if (item.children && item.children.length > 0) {
      children = getNavItems(item.children, lookupDict, depth + 1)
    }

    items.push({ title, isButton, url, children })
  }
  return items
}

const getDestination = (items, lookupDict, depth) => {
  const result = []
  for (let item of items) {
    const handler = collectionHandlers[item.collection]
    if (!handler) throw new Error('Missing handler for type ' + item.collection)
    const destinations = handler(item.item, lookupDict, depth)
    if (destinations == null) continue
    result.push(destinations)
  }
  return result
}

const NavigationItemHander = (item, navItemsDict, depth) => {
  return getNavItems([item.id], navItemsDict, depth + 1)
}

const LinkItemHandler = (item, navItemsDict, depth) => {
  return { url: item.url }
}

const PageItemHandler = (item, navItemsDict, depth) => {
  if (!isValidStatus(item.status)) return null
  return { url: '/' + getTranslatedUrl(item.slug) }
}

const collectionHandlers = {
  navigation_item: NavigationItemHander,
  page: PageItemHandler,
  link: LinkItemHandler,
}

const getCarouselLink = (item) => {
  return collectionHandlers[item.collection](item.item, [], 0).url
}
export { GetNavItems, getCarouselLink }
