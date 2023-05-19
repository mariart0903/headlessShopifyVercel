export const productsQuery = `query Products {
  products(first: 200) {
    edges {
      node {
        title,
        handle,
        tags,
        id,
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 1) {
          edges {
            node {
              transformedSrc
              altText
            }
          }
        }
      }
    }
  }
}`;

export const HPproductsQuery = `query Products {
  products(first: 12) {
    edges {
      node {
        title,
        handle,
        tags,
        id,
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 1) {
          edges {
            node {
              transformedSrc
              altText
            }
          }
        }
      }
    }
  }
}`;

export const singleProductQuery = `query getProductById($id: ID!) {
    product(id: $id) {
        id
        handle
        title
        description
        descriptionHtml
        updatedAt
        tags,
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 100) {
            edges {
                node {
                    transformedSrc
                    altText
                }
            }
        }
        variants(first: 100) {
            edges {
                node {
                    id
                    quantityAvailable
                    priceV2 {
                      amount  
                      currencyCode
                    }
                    image {
                        transformedSrc
                        altText
                    }
                    selectedOptions {
                      name
                      value
                    }
                    
                }
            }
        }
        options(first: 100){
            id
            name
            values
        }
    }
}`

export const getProductByTitleQuery = `query GetProductByTitle($title: String!) {
    products(first: 100, query: $title) {
        edges {
            node {
                variants(first: 100) {
                    edges {
                        node {
                            id
                            quantityAvailable
                        }
                    }
                }
            }
        }
    }
}
`;

export const getMenuCollections = `query {
  menu(handle: "collections-menu"){ 
    itemsCount
    items {
      resourceId
      id
      title
      items {
        id
        resourceId
        title
      }
    }
    title
  }
}
`;

export const singleCollectionQuery = `query getCollectionById($id: ID!) {
  collection(id: $id) {
    title
    descriptionHtml
    handle
    image {
      url
      altText
    }
    products(first: 100) {
      edges {
        node {
          title,
          handle,
          tags,
          id,
          priceRange {
            minVariantPrice {
              amount
            }
            maxVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                transformedSrc
                altText
              }
            }
          }
        }
      }
    }
  }
}
`;

export const filteredCollectionQuery = `query getCollectionById($handle: String!, $filters: [ProductFilter!] ) {
  collection(handle: $handle) {
    title
    descriptionHtml
    handle
    image {
      url
      altText
    }
    products(first: 100, filters: $filters) {
      edges {
        node {
          title,
          handle,
          tags,
          id,
          priceRange {
            minVariantPrice {
              amount
            }
            maxVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                transformedSrc
                altText
              }
            }
          }
        }
      }
    }
  }
}
`;

export const getAllCollectionsQuery = `query {
  collections(first: 200) {
    edges {
      node {
        id
        title
        descriptionHtml
        image {
          url
          altText
        }
      }
    }
  }
}`;

export const getAllArticlesQuery = `query getBlogBySlug($handle: String!){
   blog(handle: $handle) {
    title
    articles(first: 200) {
      edges {
        node {
          title
          excerptHtml
          id
          handle
          image {
            url
            altText
          }
        }
      }
    }
  } 
}
`;

export const getArticleByHandleQuery = `query getBlogBySlug($handle: String!, $articleHandle: String!){
   blog(handle: $handle) {
    articleByHandle(handle: $articleHandle) {
      title
      contentHtml
      excerptHtml
      id
      handle
      image {
        url
        altText
        height
        width
      }
    }
  } 
}`;

export const getRecommendedProductsQuery = `query getRecProductsByID($productId: ID!){
     productRecommendations(productId: $productId) {
          title,
          handle,
          tags,
          id,
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                transformedSrc
                altText
              }
            }
          }
      }
}`;

export const getCollectionFacets = `query Facets($handle: String!) {
  collectionByHandle(handle: $handle) {
    handle
    products(first: 100) {
      filters {
        id
        label
        type
        values {
          id
          label
          count
          input
        }
      }
    }
  }
}`;

export const getProductByTitleQuery2 = `query GetProductByTitle($title: String!) {
    products(first: 8, query: $title) {
         edges {
        node {
          title,
          handle,
          tags,
          id,
          priceRange {
            minVariantPrice {
              amount
            }
            maxVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                transformedSrc
                altText
              }
            }
          }
        }
      }
    }
}
`;