import * as React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="max-w-screen-md mx-auto pt-10">
        <h2 className="text-2xl">Hello there! I am</h2>
        <h1 className="text-4xl mt-2">Muhammad Urwatil Wutsqo</h1>
        <p className="text-lg max-w-md mt-2">
          Computer science student and software engineering enthusiast from
          Indonesia
          <span role="img" aria-label="Indonesian Flag">
            🇮🇩
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default IndexPage;
