import * as React from "react";
import TextTransition, { presets } from "react-text-transition";
import SEO from "../components/seo";
import Nav from "../components/navbar";
import { FiGithub } from "@react-icons/all-files/fi/FiGithub";
import { FiLinkedin } from "@react-icons/all-files/fi/FiLinkedin";
import { FiMail } from "@react-icons/all-files/fi/FiMail";
import { SiKeybase } from "@react-icons/all-files/si/SiKeybase";

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
    <div>
      <Nav />
      <SEO title="Home" />
      <div
        className="min-h-screen p-4 dark:text-pink-100 bg-pattern bg-pink-200 dark:bg-black"
        style={{ paddingTop: "40vh" }}
      >
        <div className="max-w-screen-md mx-auto ">
          <h2 className="text-2xl sm:text-4xl font-semibold">Hello!</h2>
          <h1 className="text-4xl sm:text-6xl font-semibold">
            I'm{" "}
            <TextTransition
              text={TEXTS[index % TEXTS.length]}
              springConfig={presets.stiff}
              inline={true}
              delay={100}
            />
          </h1>
          <div className="flex gap-3 prose dark:prose-dark mt-12">
            <a href="mailto:wutsqo@ristek.cs.ui.ac.id">
              <FiMail className="h-9 w-9 hover:bg-white dark:hover:bg-pink-900 rounded p-1" />
            </a>
            <a
              href="https://linkedin.com/in/wutsqo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin className="h-9 w-9 hover:bg-white dark:hover:bg-pink-900 rounded p-1" />
            </a>
            <a
              href="http://keybase.io/wutsqo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiKeybase className="h-9 w-9 hover:bg-white dark:hover:bg-pink-900 rounded p-1" />
            </a>
            {/* <a
              href="https://goodreads.com/wutsqo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGoodreadsG className="h-9 w-9 hover:bg-white dark:hover:bg-pink-900 rounded p-1" />
            </a> */}
            <a
              href="http://github.com/wutsqo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub className="h-9 w-9 hover:bg-white dark:hover:bg-pink-900 rounded p-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
