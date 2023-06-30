import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import ArrowIcon from '../../components/ArrowIcon';
import { getGlobalData } from '../../utils/global-data';
import SEO from '../../components/SEO';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import Nav from '../../components/Nav';
import IconWP from '../../components/IconWP';

export default function Index({ wpPosts }) {
  const globalData = getGlobalData();

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <Nav />
      <ThemeSwitcher />
      <main className="w-full">
        <div className="flex gap-4 justify-center align-middle mt-12">
          <IconWP />
          <h1 className="text-3xl lg:text-5xl text-center">WordPress Blog</h1>
        </div>

        <ul className="w-full flex">
          {/* Display WordPress Posts */}
          <section className="w-full">
            <div className="flex m-5 flex-col justify-center align-middle items-center gap-2"></div>
            {wpPosts.map((wpPost, i) => (
              <li
                key={i}
                className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
              >
                <Link href="#">
                  <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                    {wpPost?.node.date && (
                      <p className="uppercase mb-3 font-bold opacity-60">
                        {wpPost?.node.date}
                      </p>
                    )}
                    <h3 className="text-xl md:text-2xl">
                      {wpPost?.node.title}
                    </h3>
                    <p>
                      {wpPost?.node.excerpt.replace(
                        /<[^>]*>|&nbsp;|&#8230;|Print|&#8217;|&#8211;/g,
                        ''
                      )}
                      <ArrowIcon className="inline" />
                    </p>
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
      wpPosts: wpData?.data.allWpPost.edges || '',
    },
  };
}
