import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import { getGlobalData } from '../../utils/global-data';
import SEO from '../../components/SEO';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Nav from '../../components/Nav';
import IconContentful from '../../components/IconContentful';
import IconShopify from '../../components/IconShopify';

export default function Product({ product, imgSrc }) {
  const globalData = getGlobalData();

  const contentfulOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="text-base leading-6 my-4">{children}</p>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-2xl font-bold my-6">{children}</h2>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal ml-6 my-4">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="list-disc ml-3">{children}</li>
      ),
    },
  };

  const parsedContent = JSON.parse(product.node.content.raw);
  const renderedContent = documentToReactComponents(
    parsedContent,
    contentfulOptions
  );

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <Nav />
      <ThemeSwitcher />
      <main className="w-full">
        <div className="flex gap-4 justify-center align-middle mt-12">
          <IconContentful />
          <h1 className="text-3xl lg:text-5xl mb-12">{product?.node.title}</h1>
        </div>
        <div className="flex justify-center items-center mb-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
            <Link href="/products">Back to Products</Link>
          </button>
        </div>
        <section>
          <div className="flex justify-center gap-4">
            <IconShopify />
            <img
              className="pt-5"
              src={imgSrc}
              height="500"
              width="500"
              alt="Snowboard"
            />
          </div>
          <IconContentful />
          {renderedContent}
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

export async function getStaticProps({ params }) {
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

  const products = data?.allContentfulPageBlogPost.edges;

  let product = products?.find((p) => {
    return p.node.title === params.product;
  });

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

  let productData = shopifyData?.data.allShopifyProduct.edges;

  let imgNode = productData?.find((p) => {
    let title = p.node.title;
    const regex = new RegExp(`\\b${title}\\b`, 'g');
    if (params.product.toString().match(regex)) {
      return p.node.featuredImage.src;
    } else return null;
  });

  let imgSrc = imgNode?.node.featuredImage.src || null;

  return {
    props: {
      product,
      imgSrc,
    },
  };
}

export async function getStaticPaths() {
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

  let products = data?.allContentfulPageBlogPost.edges;

  let routes = products?.map((p) => {
    const params = `/product/${p.node.title}`;

    return params || '';
  });

  return { paths: routes, fallback: false };
}
