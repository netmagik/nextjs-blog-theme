import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import ArrowIcon from '../../components/ArrowIcon';
import { getGlobalData } from '../../utils/global-data';
import SEO from '../../components/SEO';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { useRouter } from 'next/router';

export default function Story() {

  const router = useRouter();
  const { products } = router.query;

    const globalData = getGlobalData();

    console.log("Products", products)

  return (
    <Layout>
        <SEO title={globalData.name} description={globalData.blogTitle} />
        <Header name={globalData.name} />
        <ThemeSwitcher />
        <main className="w-full">
             {/* Link back to the source page */}
      <Link href="/">
        <a>Go back to Source Page</a>
      </Link>
        <h1 className="text-3xl lg:text-5xl text-center mb-12 mt-12">Story</h1>
        </main>
    </Layout>
  )
}