import * as React from "react";
import TextTransition, { presets } from "react-text-transition";
import Layout from "../components/layout";
import SEO from "../components/seo";

const TEXTS = [
  "Wutsqo",
  "from Indonesia 🇮🇩",
  "a CS Student",
  "a Book Lover",
  "a Digital Minimalist",
  "a Web Developer",
];

const IndexPage = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <Layout>
      <SEO title="Home" />
      <div
        className="max-w-screen-md mx-auto p-4 dark:text-gray-100"
        style={{ paddingTop: "50vh" }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold">Hello!</h2>
        <h1 className="text-3xl sm:text-5xl font-semibold">
          I'm{" "}
          <TextTransition
            text={TEXTS[index % TEXTS.length]}
            springConfig={presets.default}
            inline={true}
            noOverflow={true}
          />
        </h1>
        <div className="text-sm sm:text-base ">
          <div className="font-semibold" style={{ marginTop: "10vh" }}>
            Find me on
          </div>
          <a href="mailto:wutsqo@ristek.cs.ui.ac.id">email</a> •{" "}
          <a
            href="https://linkedin.com/in/wutsqo"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>{" "}
          •{" "}
          <a
            href="https://goodreads.com/wutsqo"
            target="_blank"
            rel="noopener noreferrer"
          >
            goodreads
          </a>{" "}
          •{" "}
          <a
            href="http://github.com/wutsqo"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
