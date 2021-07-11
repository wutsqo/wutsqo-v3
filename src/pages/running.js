import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { NavLink } from "../components/navbar";
import FadeWhenVisible from "../components/animation/fadewhenvisible";

const RunningPage = () => {
  return (
    <Layout>
      <SEO title="Running" />
      <div className="max-w-screen-lg pt-48 text-7xl px-4 text-center mx-auto">
        <FadeWhenVisible>coming soon!</FadeWhenVisible>
        <FadeWhenVisible>
          <div className="text-lg mt-16">
            you can visit other pages instead:
          </div>
        </FadeWhenVisible>
        <FadeWhenVisible>
          <div className="flex justify-center flex-wrap mt-8">
            <NavLink to="/about" text="About" />
            <NavLink to="/music" text="Music" />
            <NavLink to="/reads" text="Reading" />
          </div>
        </FadeWhenVisible>
      </div>
    </Layout>
  );
};

export default RunningPage;
