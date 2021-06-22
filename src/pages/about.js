import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PageHeading from "../components/heading";

const AboutPage = () => {
  return (
    <Layout>
      <SEO
        title="About Me"
        description="I'm a Computer Science student currently living in Jakarta, Indonesia."
      />
      <PageHeading title="About Me" />
      <div className="max-w-xl mx-auto px-4">
        <hr />
        <p>
          I'm a Computer Science student currently living in Jakarta, Indonesia.
          I like reading books and literature about fiction, self-help,
          philosophy, science, and technology. Sometimes I play video games or
          watch korean drama when I don't feel "energized" enough to read. I'm
          also passionate in full-stack web development.
        </p>
        <p>
          Feel free to hit me up if you are looking for a project partner, or if
          you want to talk about anything, or just simply want to have a new
          friend.
        </p>
        <hr />
        <i>
          <p>
            In the midst of winter, I found there was, within me, an invincible
            summer.
          </p>
          <p>
            And that makes me happy. For it says that no matter how hard the
            world pushes against me, within me, there’s something stronger –
            something better, pushing right back.
          </p>
        </i>
        <p className="text-right mr-4">― Albert Camus</p>
      </div>
    </Layout>
  );
};

export default AboutPage;
