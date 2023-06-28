import React from 'react';
import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="flex gap-4 justify-center text-2xl font-bold p-5">
      <Link href="/">
        <a className="py-3 px-3 hover:text-black dark:hover:text-white hover:underline">
          Home
        </a>
      </Link>
      <Link href="/products">
        <a className="py-3 px-3 hover:text-black dark:hover:text-white hover:underline">
          Products
        </a>
      </Link>
      <Link href="/blog">
        <a className="py-3 px-3 hover:text-black dark:hover:text-white hover:underline">
          Blog
        </a>
      </Link>
    </nav>
  );
};

export default Nav;
