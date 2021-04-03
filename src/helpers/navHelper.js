import { graphql, useStaticQuery } from 'gatsby'

const UnpackDirectus = (data) => data.directus.items

const getData = () => {
  const data = useStaticQuery(graphql`
    query NavBarQuery {
      directus {
        items {
          general_information {
            left_navigation {
              collection
              id
              item {
                ... on DirectusCMS_page {
                  id
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
                }
                ... on DirectusCMS_events {
                  id
                  status
                  slug
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
                  }
                }
                ... on DirectusCMS_link {
                  id
                  status
                  url
                }
                ... on DirectusCMS_events {
                  id
                  slug
                  status
                }
              }
              id
            }
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
    dict[item.id] = item.destination
  })
  return dict
}

const GetLeftNavItems = () => {
  const data = getData()
  const leftNav = data.directus.items.general_information.left_navigation
  const navItemsDict = getNavItemsDict(data.directus.items)
  console.log('LEFTNAV', leftNav, 'DICT', navItemsDict)
  const items = getNavItems(leftNav, navItemsDict)
  console.log('FINAL', items)
  return items
}

const NavigationItemHander = (item, navItemsDict, depth) => {
  if (item.status !== 'published') return null
  if (depth > 5) return null
  const id = item.id
  var destinations = navItemsDict[id]
  return {
    text: item.translations[0].name,
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
  if (item.status !== 'published') return null
  return {
    url: '/en/rooms/' + item.slug,
    text: item.name,
  }
}

const PageItemHandler = (item, navItemsDict, depth) => {
  if (item.status !== 'published') return null
  return {
    url: '/en/page/' + item.slug,
    text: item.slug,
  }
}

const NewsItemHandler = (item, navItemsDict, depth) => {
  if (item.status !== 'published') return null
  return {
    url: '/en/news/' + item.slug,
    text: item.slug,
  }
}

const collectionHandlers = {
  navigation_item: NavigationItemHander,
  room: RoomItemHandler,
  page: PageItemHandler,
  news: NewsItemHandler,
}

const getNavItems = (data, navItemsDict) => {
  return data
    .map((item) => {
      console.log('ITEM', item)
      return collectionHandlers[item.collection](item.item, navItemsDict, 0)
    })
    .filter(Boolean)
}

export { GetLeftNavItems }
