import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, wpPosts }) {
  const globalData = getGlobalData();

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1>

        <ul className="w-full flex">
          {/* Display WordPress Posts */}
          <section className="w-1/2 bg-pink-500 opacity-90">
            <h3 className="text-2xl lg:text-3xl text-center mb-12">
              WordPress Data
            </h3>
            {wpPosts.map((wpPost, i) => (
              <li
                key={i}
                className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
              >
                <Link href={`/posts/[slug]`}>
                  <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                    {wpPost.node.date && (
                      <p className="uppercase mb-3 font-bold opacity-60">
                        {wpPost.node.date}
                      </p>
                    )}
                    <h3 className="text-xl md:text-2xl">{wpPost.node.title}</h3>
                   
                    <ArrowIcon className="mt-4" />
                  </a>
                </Link>
              </li>
            ))}
          </section>

          <section className="w-1/2">
            <h3 className="text-2xl lg:text-3xl text-center mb-12">
              Contentful Data
            </h3>
            {/* Display Contentful Blog Posts */}
            {posts?.map((post, index) => (
              <li
                key={index}
                className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
              >
                <Link href={`/posts/[slug]`}>
                  <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                    {post?.node.publishedDate && (
                      <p className="uppercase mb-3 font-bold opacity-60">
                        {post?.node.publishedDate}
                      </p>
                    )}
                    <h3 className="text-xl md:text-2xl">{post?.node.title}</h3>
                  
                    <ArrowIcon className="mt-4" />
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

export const getStaticProps = async () => {
  const apiURL = 'https://contentful-bl-wdhw20-prod.valhalla-api.io/';

  const ContentfulQuery = `
  query Contentful {
    allContentfulPageBlogPost {
      edges {
        node {
          id
          title
          publishedDate
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

  return {
    props: {
      posts: data?.allContentfulPageBlogPost.edges || '',
      wpPosts: wpData?.data.allWpPost.edges || '',
    },
  };
};
