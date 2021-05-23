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
          is_button
          id
          translations {
            languages_code {
              url_code
            }
            name
          }
          children {
            collection
            id
            item {
              ... on DirectusCMS_navigation_item {
                id
              }
              ... on DirectusCMS_page {
                slug
                status
              }
              ... on DirectusCMS_link {
                url
              }
            }
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
    let children = getDestination(item.children, lookupDict, depth)
    if (children.length == 0) continue
    let url = undefined
    if (children.length == 1) {
      url = children[0].url
      children = undefined
    }
    items.push({ title, isButton, url, children })
  }
  console.log('items', items)
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
