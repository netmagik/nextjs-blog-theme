export const ContentfulQuery = `
query Contentful {
  allContentfulPageBlogPost {
    edges {
      node {
        id
        title
        publishedDate
        featuredImage {
          url
          title
        }
        content {
          raw
        }
      }
    }
  }
}
`;

