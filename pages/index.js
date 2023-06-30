import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Nav from '../components/Nav';
import IconWP from '../components/IconWP';
import IconContentful from '../components/IconContentful';
import IconShopify from '../components/IconShopify';

export default function Index({ posts, wpPosts, products }) {
  const globalData = getGlobalData();

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <Nav />
      <ThemeSwitcher />
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12 mt-12">
          {globalData.blogTitle}
        </h1>

        <ul className="w-full flex">
          {/* Display WordPress Posts */}
          <section className="w-1/3">
            <div className="flex m-5 flex-col justify-center align-middle items-center gap-2">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                aria-hidden="true"
                className="!tw-fill-current tw-h-4 tw-w-4 dark:fill-white"
              >
                <path d="M15 .9a14.011 14.011 0 0 1 7.883 2.408 14.208 14.208 0 0 1 3.81 3.81A14.011 14.011 0 0 1 29.1 15a14.011 14.011 0 0 1-2.409 7.882 14.21 14.21 0 0 1-3.81 3.81A14.011 14.011 0 0 1 15 29.1a14.011 14.011 0 0 1-7.882-2.409 14.208 14.208 0 0 1-3.81-3.81A14.011 14.011 0 0 1 .9 15a14.011 14.011 0 0 1 2.409-7.882 14.205 14.205 0 0 1 3.81-3.81A14.011 14.011 0 0 1 15 .9Zm0-.9C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15Z"></path>
                <path d="M2.5 15c0 4.947 2.875 9.223 7.045 11.249L3.582 9.913A12.451 12.451 0 0 0 2.5 14.999Zm20.939-.63c0-1.546-.555-2.616-1.03-3.448-.635-1.03-1.229-1.902-1.229-2.932 0-1.149.871-2.218 2.1-2.218.055 0 .107.006.161.01A12.453 12.453 0 0 0 15 2.5c-4.367 0-8.209 2.24-10.444 5.634.293.01.57.015.804.015 1.308 0 3.332-.159 3.332-.159.673-.04.753.95.08 1.03 0 0-.678.08-1.43.119l4.551 13.54 2.736-8.204-1.947-5.336c-.674-.04-1.311-.119-1.311-.119-.674-.04-.595-1.07.079-1.03 0 0 2.064.16 3.292.16 1.307 0 3.332-.16 3.332-.16.674-.04.753.95.08 1.03 0 0-.679.08-1.431.119l4.517 13.437 1.29-4.086c.573-1.786.909-3.051.909-4.12Zm-8.22 1.723L11.47 26.99a12.493 12.493 0 0 0 7.682-.2 1.143 1.143 0 0 1-.09-.172L15.22 16.093Zm10.75-7.09c.054.398.084.825.084 1.285 0 1.268-.237 2.694-.95 4.477l-3.818 11.039C25 23.637 27.5 19.61 27.5 15c0-2.174-.555-4.217-1.53-5.997Z"></path>
              </svg> */}
              <IconWP />
              <h3 className="text-2xl lg:text-3xl">WordPress Data</h3>
            </div>
            {wpPosts.map((wpPost, i) => (
              <li
                key={i}
                className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
              >
                <Link href="#">
                  <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                    {wpPost.node.date && (
                      <p className="uppercase mb-3 text-center font-bold opacity-60">
                        {wpPost.node.date}
                      </p>
                    )}
                    <h3 className="text-xl text-center md:text-2xl">
                      {wpPost.node.title}
                    </h3>

                    <ArrowIcon className="m-auto" />
                  </a>
                </Link>
              </li>
            ))}
          </section>

          {/* Display Contentful Blog Posts */}
          <section className="w-1/3">
            <div className="flex m-5 flex-col justify-center align-middle items-center gap-2">
              <IconContentful />
              <h3 className="text-2xl lg:text-3xl">Contentful Data</h3>
            </div>
            {posts?.map((post, index) => (
              <li
                key={index}
                className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
              >
                <Link href="#">
                  <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                    {post?.node.publishedDate && (
                      <p className="uppercase mb-3 font-bold opacity-60 text-center">
                        {post?.node.publishedDate}
                      </p>
                    )}
                    <h3 className="text-xl md:text-2xl text-center">
                      {post?.node.title}
                    </h3>
                    {/* <img className="m-auto pt-5" src={post?.node.featuredImage.url} height="150" width="150" alt={post.node.featuredImage.title} /> */}
                  </a>
                </Link>
              </li>
            ))}
          </section>

          {/* Display Shopify Products */}
          <section className="w-1/3">
            <div className="flex m-5 flex-col justify-center align-middle items-center gap-2">
              <IconShopify />
              <h3 className="text-2xl lg:text-3xl">Shopify Products</h3>
            </div>
            {products?.map((product, index) => (
              <li
                key={index}
                className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
              >
                <Link href="#">
                  <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                    {product?.node.priceRangeV2.maxVariantPrice.amount && (
                      <p className="text-center text-xl md:text-2xl uppercase mb-3 font-bold">
                        ${product?.node.priceRangeV2.maxVariantPrice.amount}
                      </p>
                    )}
                    <h3 className="text-xl text-center md:text-2xl">
                      {product?.node.title}
                    </h3>
                    <img
                      className="m-auto pt-5"
                      src={product?.node.featuredImage.src}
                      height="100"
                      width="100"
                      alt={product?.node.featuredImage.altText}
                    />
                  </a>
                </Link>
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

export async function getStaticProps() {
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
          content {
            raw
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
          date(formatString: "MMMM DD, YYYY")
          title
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
}
