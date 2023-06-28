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
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 60 30"
            aria-hidden="true"
            className="!tw-fill-current tw-h-4 tw-w-4 mt-2"
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
      
          <img
            className="pt-5"
            src={imgSrc}
            height="500"
            width="500"
            alt="Snowboard"
          />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            aria-hidden="true"
            className="!tw-fill-current tw-h-4 tw-w-4 mt-10"
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
