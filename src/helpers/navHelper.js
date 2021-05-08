import { InsertEmoticon } from '@material-ui/icons'
import { graphql, useStaticQuery } from 'gatsby'
import { isValidStatus } from './helper'
import {
  UrlLanguageCode,
  getTranslation,
  getTranslatedUrl,
} from './languageHelper'

const UnpackDirectus = (data) => data.directus.items

const getData = () => {
  const data = useStaticQuery(graphql`
    query NavBarQuery {
      directus {
        general_information {
          left_navigation {
            collection
            id
            item {
              ... on DirectusCMS_page {
                id
                status
                slug
                translations {
                  name
                  languages_code {
                    url_code
                  }
                }
              }
              ... on DirectusCMS_news {
                id
                status
                slug
              }
              ... on DirectusCMS_navigation_item {
                id
                status
                translations {
                  name
                  languages_code {
                    url_code
                  }
                }
              }
              ... on DirectusCMS_link {
                id
                status
                url
                button
                translations {
                  name
                  languages_code {
                    url_code
                  }
                }
              }
              ... on DirectusCMS_events {
                id
                status
                slug
              }
              ... on DirectusCMS_room {
                id
                name
              }
              ... on DirectusCMS_group {
                id
                status
                slug
                translations {
                  languages_code {
                    url_code
                  }
                }
              }
            }
          }
          right_navigation {
            collection
            id
            item {
              ... on DirectusCMS_page {
                id
                status
                slug
                translations {
                  name
                  languages_code {
                    url_code
                  }
                }
              }
              ... on DirectusCMS_news {
                id
                status
                slug
              }
              ... on DirectusCMS_navigation_item {
                id
                status
                translations {
                  name
                  languages_code {
                    url_code
                  }
                }
              }
              ... on DirectusCMS_link {
                id
                status
                url
                button
                translations {
                  name
                  languages_code {
                    url_code
                  }
                }
              }
              ... on DirectusCMS_events {
                id
                status
                slug
              }
              ... on DirectusCMS_group {
                id
                status
                slug
                translations {
                  languages_code {
                    url_code
                  }
                }
              }
              ... on DirectusCMS_room {
                id
                name
              }
            }
          }
        }
        navigation_item {
          status
          translations {
            name
          }
          destination {
            collection
            item {
              ... on DirectusCMS_page {
                id
                status
                slug
                translations {
                  name
                  languages_code {
                    url_code
                  }
                }
              }
              ... on DirectusCMS_room {
                id
                name
                status
                slug
              }
              ... on DirectusCMS_news {
                id
                status
                slug
              }
              ... on DirectusCMS_navigation_item {
                id
                status
                translations {
                  name
                  languages_code {
                    url_code
                  }
                }
              }
              ... on DirectusCMS_link {
                id
                status
                url
                button
                translations {
                  name
                  languages_code {
                    url_code
                  }
                }
              }
              ... on DirectusCMS_events {
                id
                slug
                status
              }
              ... on DirectusCMS_group {
                id
                slug
                status
                translations {
                  languages_code {
                    url_code
                  }
                }
              }
            }
            id
          }
          id
        }
      }
    }
  `)
  return data
}

const getNavItemsDict = (allNavItems) => {
  let dict = {}
  allNavItems.navigation_item.forEach((item) => {
    dict[item.id] = item.destination
  })
  return dict
}

const GetNavItems = () => {
  const data = getData()
  const leftNav = data.directus.general_information.left_navigation
  const rightNav = data.directus.general_information.right_navigation
  const navItemsDict = getNavItemsDict(data.directus)
  const leftNavItems = getNavItems(leftNav, navItemsDict)
  const rightNavItems = getNavItems(rightNav, navItemsDict)
  return { leftNavItems, rightNavItems }
}

const NavigationItemHander = (item, navItemsDict, depth) => {
  if (!isValidStatus(item.status)) return null
  if (depth > 5) return null
  const id = item.id
  var destinations = navItemsDict[id]

  const translation = getTranslation(item.translations)
  if (!translation) return null

  return {
    text: translation.name,
    items: destinations
      .map((child) =>
        collectionHandlers[child.collection](
          child.item,
          navItemsDict,
          depth + 1
        )
      )
      .filter(Boolean),
  }
}

const RoomItemHandler = (item, navItemsDict, depth) => {
  if (!isValidStatus(item.status)) return null
  return {
    url: '/' + getTranslatedUrl('room/' + item.slug),
    text: item.name,
  }
}

const LinkItemHandler = (item, navItemsDict, depth) => {
  if (!isValidStatus(item.status)) return null

  const translation = getTranslation(item.translations)
  if (!translation) return null

  return {
    url: item.url,
    text: translation.name,
    isButton: item.button,
  }
}

const PageItemHandler = (item, navItemsDict, depth) => {
  if (!isValidStatus(item.status)) return null

  const translation = getTranslation(item.translations)
  if (!translation) return null
  return {
    url: '/' + getTranslatedUrl(item.slug),
    text: translation.name || item.slug,
  }
}

const NewsItemHandler = (item, navItemsDict, depth) => {
  if (!isValidStatus(item.status)) return null
  return {
    url: '/' + getTranslatedUrl('news/' + item.slug),
    text: item.slug,
  }
}

const GroupItemHandler = (item, navItemsDict, depth) => {
  console.log('GROUP ITEM', item)
  if (!isValidStatus(item.status)) return null

  const translation = getTranslation(item.translations)
  if (!translation) return null
  return {
    url: '/' + getTranslatedUrl('group/' + item.slug),
    text: translation.name || item.slug,
  }
}

const collectionHandlers = {
  navigation_item: NavigationItemHander,
  room: RoomItemHandler,
  page: PageItemHandler,
  news: NewsItemHandler,
  link: LinkItemHandler,
  group: GroupItemHandler,
}

const getNavItems = (data, navItemsDict) => {
  return data
    .map((item) => {
      return collectionHandlers[item.collection](item.item, navItemsDict, 0)
    })
    .filter(Boolean)
}

export { GetNavItems }
