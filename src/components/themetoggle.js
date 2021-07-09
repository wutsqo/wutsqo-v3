import React from "react";
import { ThemeToggler } from "gatsby-plugin-dark-mode";
import { Switch } from "@headlessui/react";

export default function ThemeToggle() {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <div>
          <Switch
            onChange={(e) => toggleTheme(theme === "light" ? "dark" : "light")}
            className={`${
              theme === "dark" ? "bg-pink-900" : "bg-gray-200"
            } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none`}
          >
            <span className="sr-only">Enable Dark Theme</span>
            <span
              className={`${
                theme === "dark" ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        </div>
      )}
    </ThemeToggler>
  );
}
