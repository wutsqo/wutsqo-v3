/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="dark:bg-black dark:text-gray-100 bg-pink-50">
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div>
        <main className="min-h-screen pt-16">{children}</main>
        <footer className="text-center text-sm p-12 z-20 relative bg-white dark:bg-black">
          © {new Date().getFullYear()}, Muhammad Urwatil Wutsqo
        </footer>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
