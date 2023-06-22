import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function Index({ posts, wpPosts, products }) {
  const globalData = getGlobalData();

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <ThemeSwitcher />
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12 mt-12">
          {globalData.blogTitle}
        </h1>

        <ul className="w-full flex">
          {/* Display Shopify Products */}
          <section className="w-full">
            {products?.map((product, index) => (
              <li
                key={index}
                className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
              >
                <article className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  <h2 className="text-2xl md:text-3xl dark:text-cyan-500">
                    {product?.node.title}
                  </h2>

                  {product?.node.priceRangeV2.maxVariantPrice.amount && (
                    <p className="text-xl md:text-2xl uppercase mb-3 font-bold">
                      ${product?.node.priceRangeV2.maxVariantPrice.amount}
                    </p>
                  )}
                  <div className="lg:flex gap-5 pt-5">
                    <div className='lg:w-1/2'>
                      <img
                        src={product?.node.featuredImage.src}
                        height="500"
                        width="500"
                        alt={product?.node.featuredImage.altText}
                      />
                    </div>
                    {/* Contentful Data */}
                    <div className='lg:w-1/2'>
                      <p className="dark:text-cyan-500 text-xl font-bold p-3 border-sky-900 border-2 border-solid dark:border-cyan-500">
                        Some Contentful Data
                      </p>
                      <div className="flex gap-3 pt-5">
                        <img
                          className="w-1/3"
                          src={posts[index]?.node.featuredImage.url}
                          height="150"
                          width="150"
                          alt={posts[index]?.node.featuredImage.title}
                        />
                        <div className="w-2/3">
                          <h3 className="text-l md:text-xl">
                            <span className="font-bold">Title: </span>{' '}
                            {posts[index]?.node.title}
                          </h3>
                          <p className="my-3 text-lg">
                            <span className="font-bold">Description: </span>{' '}
                            {
                              posts[index]?.node.shortDescription
                                .shortDescription
                            }
                          </p>
                        </div>
                      </div>

                      {/* WordPress Data */}
                      <p className="dark:text-cyan-500 mt-3 text-xl font-bold p-3 border-2 border-solid dark:border-cyan-500 border-sky-900">
                        Some WordPress Data
                      </p>
                      <p className="my-2 font-bold text-xl">
                        {wpPosts[index]?.node.title}
                      </p>
                      <p>
                        {wpPosts[index]?.node.excerpt.replace(
                          /<[^>]*>|&nbsp;|&#8230;|Print|&#8217;|&#8211;/g,
                          ''
                        )}
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </section>
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const apiURL = process.env.apiURL;

  const ContentfulQuery = `
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
          shortDescription {
            shortDescription
          }
        }
      }
    }
  }
  `;

  const WordPressQuery = `
  query WordPress {
    allWpPost {
      edges {
        node {
          id
          title
          date(formatString: "MMMM DD, YYYY")
          excerpt
        }
      }
    }
  }
  `;

  const ShopifyQuery = `
  query Shopify {
    allShopifyProduct {
      edges {
        node {
          title
          priceRangeV2 {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            src
            altText
          }
        }
      }
    }
  }
  `;
  // Fetch Data from Contentful
  const response1 = await fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ContentfulQuery,
    }),
  });

  const { data } = await response1.json();

  // Fetch data from WordPress
  const response2 = await fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: WordPressQuery,
    }),
  });

  const wpData = await response2.json();

  // Fetch data from Shopify
  const response3 = await fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ShopifyQuery,
    }),
  });

  const shopifyData = await response3.json();

  return {
    props: {
      posts: data?.allContentfulPageBlogPost.edges || '',
      wpPosts: wpData?.data.allWpPost.edges || '',
      products: shopifyData?.data.allShopifyProduct.edges || '',
    },
  };
};
