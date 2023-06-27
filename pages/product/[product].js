import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import { getGlobalData } from '../../utils/global-data';
import SEO from '../../components/SEO';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

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
            viewBox="0 0 30 30"
            aria-hidden="true"
            className="!tw-fill-current tw-h-4 tw-w-4"
          >
            <path
              fill="#FAE501"
              d="M11.095 20.906c-1.594-1.5-2.531-3.563-2.531-5.907a8.28 8.28 0 0 1 2.438-5.906 3.282 3.282 0 0 0 0-4.687 3.283 3.283 0 0 0-4.689 0C3.688 7.124 2 10.874 2 14.999s1.688 7.875 4.407 10.594a3.283 3.283 0 0 0 4.688 0 3.461 3.461 0 0 0 0-4.687Z"
            ></path>
            <path
              fill="#4FB5E1"
              d="M11.095 9.094c1.5-1.594 3.563-2.532 5.908-2.532 2.344 0 4.407.938 5.907 2.438a3.283 3.283 0 0 0 4.688 0 3.282 3.282 0 0 0 0-4.688C24.878 1.687 21.128 0 17.003 0 12.877 0 9.126 1.688 6.407 4.406a3.282 3.282 0 0 0 0 4.688 3.463 3.463 0 0 0 4.688 0Z"
            ></path>
            <path
              fill="#F05751"
              d="M22.91 20.906c-1.5 1.594-3.563 2.532-5.907 2.532A8.283 8.283 0 0 1 11.095 21a3.283 3.283 0 0 0-4.688 0 3.282 3.282 0 0 0 0 4.688C9.127 28.313 12.877 30 17.003 30c4.125 0 7.876-1.688 10.595-4.406a3.282 3.282 0 0 0 0-4.688 3.463 3.463 0 0 0-4.688 0Z"
            ></path>
            <path
              fill="#0681B6"
              d="M8.751 10.032a3.281 3.281 0 1 0 .001-6.563 3.281 3.281 0 0 0 0 6.563Z"
            ></path>
            <path
              fill="#CD4739"
              d="M8.751 26.532a3.282 3.282 0 1 0 0-6.564 3.282 3.282 0 0 0 0 6.564Z"
            ></path>
          </svg>
          <h1 className="text-3xl lg:text-5xl mb-12">{product?.node.title}</h1>
        </div>
        <div className="flex justify-center items-center mb-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
            <Link href="/products">Back to Products</Link>
          </button>
        </div>
        <section className="w-full mt-12 backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 p-12 text-xl">
          <img
            className="m-auto pt-5"
            src={imgSrc}
            height="500"
            width="500"
            alt="Snowboard"
          />
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

  let product = products.find((p) => {
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

  let imgNode = productData.find((p) => {
    let title = p.node.title;
    const regex = new RegExp(`\\b${title}\\b`, 'g');
    if (params.product.toString().match(regex)) {
      return p.node.featuredImage.src;
    } else return null;
  });

  let imgSrc = imgNode.node.featuredImage.src;

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
  let routes = products.map((p) => {
    const params = `/product/${p.node.title}`;

    return params;
  });

  return { paths: routes, fallback: false };
}
