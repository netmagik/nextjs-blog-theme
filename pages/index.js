import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import ThemeSwitcher from '../components/ThemeSwitcher';


export default function Index({ posts, wpPosts, products }) {

  const globalData = getGlobalData();

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <nav className="flex gap-4 justify-center text-2xl font-bold p-5">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/blog">Blog</Link>
      </nav>
      <ThemeSwitcher />
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12 mt-12">
          {globalData.blogTitle}
        </h1>
  
        <ul className="w-full flex">

          {/* Display WordPress Posts */}
          <section className="w-1/3">
          <div className='flex m-5 flex-col justify-center align-middle items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true" className="!tw-fill-current tw-h-4 tw-w-4"><path d="M15 .9a14.011 14.011 0 0 1 7.883 2.408 14.208 14.208 0 0 1 3.81 3.81A14.011 14.011 0 0 1 29.1 15a14.011 14.011 0 0 1-2.409 7.882 14.21 14.21 0 0 1-3.81 3.81A14.011 14.011 0 0 1 15 29.1a14.011 14.011 0 0 1-7.882-2.409 14.208 14.208 0 0 1-3.81-3.81A14.011 14.011 0 0 1 .9 15a14.011 14.011 0 0 1 2.409-7.882 14.205 14.205 0 0 1 3.81-3.81A14.011 14.011 0 0 1 15 .9Zm0-.9C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15Z"></path><path d="M2.5 15c0 4.947 2.875 9.223 7.045 11.249L3.582 9.913A12.451 12.451 0 0 0 2.5 14.999Zm20.939-.63c0-1.546-.555-2.616-1.03-3.448-.635-1.03-1.229-1.902-1.229-2.932 0-1.149.871-2.218 2.1-2.218.055 0 .107.006.161.01A12.453 12.453 0 0 0 15 2.5c-4.367 0-8.209 2.24-10.444 5.634.293.01.57.015.804.015 1.308 0 3.332-.159 3.332-.159.673-.04.753.95.08 1.03 0 0-.678.08-1.43.119l4.551 13.54 2.736-8.204-1.947-5.336c-.674-.04-1.311-.119-1.311-.119-.674-.04-.595-1.07.079-1.03 0 0 2.064.16 3.292.16 1.307 0 3.332-.16 3.332-.16.674-.04.753.95.08 1.03 0 0-.679.08-1.431.119l4.517 13.437 1.29-4.086c.573-1.786.909-3.051.909-4.12Zm-8.22 1.723L11.47 26.99a12.493 12.493 0 0 0 7.682-.2 1.143 1.143 0 0 1-.09-.172L15.22 16.093Zm10.75-7.09c.054.398.084.825.084 1.285 0 1.268-.237 2.694-.95 4.477l-3.818 11.039C25 23.637 27.5 19.61 27.5 15c0-2.174-.555-4.217-1.53-5.997Z"></path></svg>
              <h3 className="text-2xl lg:text-3xl">
                WordPress Data
              </h3>
            </div>
            {wpPosts.map((wpPost, i) => (
              <li
                key={i}
                className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
              >
                <Link href='#'>
                  <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                    {wpPost.node.date && (
                      <p className="uppercase mb-3 text-center font-bold opacity-60">
                        {wpPost.node.date}
                      </p>
                    )}
                    <h3 className="text-xl text-center md:text-2xl">{wpPost.node.title}</h3>
                   
                    <ArrowIcon className="m-auto" />
                  </a>
                </Link>
              </li>
            ))}
          </section>

          {/* Display Contentful Blog Posts */}
          <section className="w-1/3">
            <div className='flex m-5 flex-col justify-center align-middle items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true" className="!tw-fill-current tw-h-4 tw-w-4"><path fill="#FAE501" d="M11.095 20.906c-1.594-1.5-2.531-3.563-2.531-5.907a8.28 8.28 0 0 1 2.438-5.906 3.282 3.282 0 0 0 0-4.687 3.283 3.283 0 0 0-4.689 0C3.688 7.124 2 10.874 2 14.999s1.688 7.875 4.407 10.594a3.283 3.283 0 0 0 4.688 0 3.461 3.461 0 0 0 0-4.687Z"></path><path fill="#4FB5E1" d="M11.095 9.094c1.5-1.594 3.563-2.532 5.908-2.532 2.344 0 4.407.938 5.907 2.438a3.283 3.283 0 0 0 4.688 0 3.282 3.282 0 0 0 0-4.688C24.878 1.687 21.128 0 17.003 0 12.877 0 9.126 1.688 6.407 4.406a3.282 3.282 0 0 0 0 4.688 3.463 3.463 0 0 0 4.688 0Z"></path><path fill="#F05751" d="M22.91 20.906c-1.5 1.594-3.563 2.532-5.907 2.532A8.283 8.283 0 0 1 11.095 21a3.283 3.283 0 0 0-4.688 0 3.282 3.282 0 0 0 0 4.688C9.127 28.313 12.877 30 17.003 30c4.125 0 7.876-1.688 10.595-4.406a3.282 3.282 0 0 0 0-4.688 3.463 3.463 0 0 0-4.688 0Z"></path><path fill="#0681B6" d="M8.751 10.032a3.281 3.281 0 1 0 .001-6.563 3.281 3.281 0 0 0 0 6.563Z"></path><path fill="#CD4739" d="M8.751 26.532a3.282 3.282 0 1 0 0-6.564 3.282 3.282 0 0 0 0 6.564Z"></path></svg>
              <h3 className="text-2xl lg:text-3xl">
                Contentful Data
              </h3>
            </div>
            {posts?.map((post, index) => (
              <li
                key={index}
                className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
              >
                <Link href='#'>
                  <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                    {post?.node.publishedDate && (
                      <p className="uppercase mb-3 font-bold opacity-60 text-center">
                        {post?.node.publishedDate}
                      </p>
                    )}
                    <h3 className="text-xl md:text-2xl text-center">{post?.node.title}</h3>
                  {/* <img className="m-auto pt-5" src={post?.node.featuredImage.url} height="150" width="150" alt={post.node.featuredImage.title} /> */}
                  </a>
                </Link>
              </li>
            ))}
          </section>

          {/* Display Shopify Products */}
          <section className="w-1/3">
            <div className='flex m-5 flex-col justify-center align-middle items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 27 30" aria-hidden="true" className="!tw-fill-current tw-h-4 tw-w-4"><path fill="#95BF47" d="M23.1 5.76a.28.28 0 0 0-.26-.24l-2.24-.05-1.95-1.9c-.17-.17-.53-.12-.65-.08l-.9.27a7.06 7.06 0 0 0-.42-1.06C16.05 1.5 15.1.84 14 .84c-.07 0-.14 0-.24.03-.02-.05-.07-.07-.1-.12A2.3 2.3 0 0 0 11.81 0c-1.45.05-2.9 1.08-4.05 2.94a11.94 11.94 0 0 0-1.64 4.22c-1.66.5-2.82.86-2.84.89-.85.26-.87.29-.97 1.08L.02 26.73l18.41 3.17 7.98-1.97c-.02-.03-3.28-22.03-3.3-22.17Zm-6.9-1.71c-.44.12-.92.29-1.43.43 0-.72-.1-1.76-.43-2.63 1.08.22 1.61 1.45 1.85 2.2Zm-2.42.75-3.08.94a7.43 7.43 0 0 1 1.54-3.02c.27-.26.63-.58 1.04-.77.43.84.53 2.03.5 2.84ZM11.83.96c.34 0 .63.08.87.22a4.72 4.72 0 0 0-1.13.9 8.6 8.6 0 0 0-1.9 4l-2.54.76c.5-2.31 2.46-5.8 4.7-5.88Z"></path><path fill="#5E8E3E" d="m22.84 5.52-2.24-.05-1.95-1.9a.46.46 0 0 0-.24-.12v26.43l7.98-1.98L23.1 5.73a.28.28 0 0 0-.27-.21Z"></path><path fill="#fff" d="m13.98 9.61-.92 3.47s-1.04-.48-2.27-.38C9 12.82 9 13.95 9 14.24c.1 1.54 4.17 1.88 4.4 5.52.18 2.87-1.51 4.82-3.94 4.96-2.94.2-4.56-1.54-4.56-1.54l.63-2.65s1.61 1.23 2.91 1.13a1.16 1.16 0 0 0 1.14-1.23c-.12-2.02-3.45-1.9-3.67-5.22-.17-2.8 1.67-5.64 5.71-5.89a4.7 4.7 0 0 1 2.37.3Z"></path></svg>              <h3 className="text-2xl lg:text-3xl">
                Shopify Products
              </h3>
            </div>
            {products?.map((product, index) => (
              <li
                key={index}
                className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
              >
                <Link href='#'>
                  <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                    {product?.node.priceRangeV2.maxVariantPrice.amount && (
                      <p className="text-center text-xl md:text-2xl uppercase mb-3 font-bold">
                        ${product?.node.priceRangeV2.maxVariantPrice.amount}
                      </p>
                    )}
                    <h3 className="text-xl text-center md:text-2xl">{product?.node.title}</h3>
                      <img className="m-auto pt-5" src={product?.node.featuredImage.src} height="100" width="100" alt={product?.node.featuredImage.altText} />
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
  `
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
      query: ShopifyQuery
    })
  })

  const shopifyData = await response3.json();

  return {
    props: {
      posts: data?.allContentfulPageBlogPost.edges || '',
      wpPosts: wpData?.data.allWpPost.edges || '',
      products: shopifyData?.data.allShopifyProduct.edges || ''
    },
  };
};
