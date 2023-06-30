import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import { getGlobalData } from '../../utils/global-data';
import SEO from '../../components/SEO';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import Nav from '../../components/Nav';
import IconShopify from '../../components/IconShopify';

export default function Products({ products }) {
  const globalData = getGlobalData();

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <Nav />
      <ThemeSwitcher />
      <main className="w-full">
        <div className="flex gap-4 justify-center align-middle mt-12">
          <IconShopify />
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
