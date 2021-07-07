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
        className="min-h-screen p-4 dark:text-pink-100 bg-pink-100 dark:bg-black"
        style={{
          paddingTop: "40vh",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23cc0000' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23aa0000' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23d6002b' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23b10022' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d9004b' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23b2003d' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23d3006c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23ac0057' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23c4008c' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%239e0071' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23aa00aa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23880088' points='943 900 1210 900 971 687'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
        }}
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
