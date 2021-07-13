import React from "react";
import { ThemeToggler } from "gatsby-plugin-dark-mode";
import useSound from "use-sound";
import onSfx from "../sounds/switch-on.mp3";
import offSfx from "../sounds/switch-off.mp3";

export default function ThemeToggle() {
  const [on] = useSound(onSfx);
  const [off] = useSound(offSfx);
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <div>
          <button
            className="focus:outline-none text-2xl h-9 w-9 flex items-center justify-center text-center"
            onClick={() => {
              theme === "dark" ? on() : off();
              toggleTheme(theme === "light" ? "dark" : "light");
            }}
          >
            <div
              className={`absolute ${
                theme === "light"
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0 rotate-45"
              } transition duration-500 ease-in-out transform`}
            >
              ☀️
            </div>

            <div
              className={`absolute ${
                theme === "dark"
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0 rotate-45"
              } transition duration-500 ease-in-out transform`}
            >
              🌙
            </div>
          </button>
        </div>
      )}
    </ThemeToggler>
  );
}
