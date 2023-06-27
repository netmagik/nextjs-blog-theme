import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import { getGlobalData } from '../../utils/global-data';
import SEO from '../../components/SEO';
import ThemeSwitcher from '../../components/ThemeSwitcher';

export default function Products({ products }) {
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
        <div className="flex gap-4 justify-center align-middle mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 27 30"
            aria-hidden="true"
            className="!tw-fill-current tw-h-4 tw-w-4"
          >
            <path
              fill="#95BF47"
              d="M23.1 5.76a.28.28 0 0 0-.26-.24l-2.24-.05-1.95-1.9c-.17-.17-.53-.12-.65-.08l-.9.27a7.06 7.06 0 0 0-.42-1.06C16.05 1.5 15.1.84 14 .84c-.07 0-.14 0-.24.03-.02-.05-.07-.07-.1-.12A2.3 2.3 0 0 0 11.81 0c-1.45.05-2.9 1.08-4.05 2.94a11.94 11.94 0 0 0-1.64 4.22c-1.66.5-2.82.86-2.84.89-.85.26-.87.29-.97 1.08L.02 26.73l18.41 3.17 7.98-1.97c-.02-.03-3.28-22.03-3.3-22.17Zm-6.9-1.71c-.44.12-.92.29-1.43.43 0-.72-.1-1.76-.43-2.63 1.08.22 1.61 1.45 1.85 2.2Zm-2.42.75-3.08.94a7.43 7.43 0 0 1 1.54-3.02c.27-.26.63-.58 1.04-.77.43.84.53 2.03.5 2.84ZM11.83.96c.34 0 .63.08.87.22a4.72 4.72 0 0 0-1.13.9 8.6 8.6 0 0 0-1.9 4l-2.54.76c.5-2.31 2.46-5.8 4.7-5.88Z"
            ></path>
            <path
              fill="#5E8E3E"
              d="m22.84 5.52-2.24-.05-1.95-1.9a.46.46 0 0 0-.24-.12v26.43l7.98-1.98L23.1 5.73a.28.28 0 0 0-.27-.21Z"
            ></path>
            <path
              fill="#fff"
              d="m13.98 9.61-.92 3.47s-1.04-.48-2.27-.38C9 12.82 9 13.95 9 14.24c.1 1.54 4.17 1.88 4.4 5.52.18 2.87-1.51 4.82-3.94 4.96-2.94.2-4.56-1.54-4.56-1.54l.63-2.65s1.61 1.23 2.91 1.13a1.16 1.16 0 0 0 1.14-1.23c-.12-2.02-3.45-1.9-3.67-5.22-.17-2.8 1.67-5.64 5.71-5.89a4.7 4.7 0 0 1 2.37.3Z"
            ></path>
          </svg>
          <h1 className="text-3xl lg:text-5xl mb-12">Shopify Products</h1>
        </div>

        <section className="w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((product, index) => (
              <div
                key={index}
                className="text-center p-3 md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
              >
                <Link href={`/product/${product.node.title}`}>
                  <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                    <h2 className="text-xl dark:text-cyan-500 font-bold">
                      {product?.node.title}
                    </h2>
                    {product?.node.priceRangeV2.maxVariantPrice.amount && (
                      <p className="text-xl md:text-2xl uppercase mb-3 font-bold">
                        ${product?.node.priceRangeV2.maxVariantPrice.amount}
                      </p>
                    )}
                    <img
                      className="m-auto"
                      src={product?.node.featuredImage.src}
                      height="150"
                      width="150"
                      alt={product?.node.featuredImage.altText}
                    />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </section>
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
      products: shopifyData?.data.allShopifyProduct.edges || '',
    },
  };
}
