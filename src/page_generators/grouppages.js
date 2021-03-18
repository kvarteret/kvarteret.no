

module.exports.generate = async (createPage, graphql, actions) => {
    const response = await graphql(`
    query GroupItems {
        directus {
          items {
            group {
              date_updated
              id
              slug
              sort
              status
              translations {
                group_id {
                  date_updated
                  id
                  slug
                  sort
                  status
                }
                languages_code {
                  name
                  url_code
                  code
                }
              }
            }
          }
        }
      }
    `);

}