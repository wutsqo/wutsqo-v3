import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "gatsby";
import ThemeToggle from "./themetoggle";
import { debounce, throttle } from "throttle-debounce";

const NavLink = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="py-2 my-2 rounded px-2 mx-2 text-lg no-underline bg-transparent"
      activeClassName="bg-pink-200 dark:bg-pink-900 dark:text-white text-black"
    >
      {text}
    </Link>
  );
};

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(100, () => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 350
    );
    setIsOpen(false);

    setPrevScrollPos(currentScrollPos);
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <div>
      <nav
        className={`fixed w-full z-50 bg-white text-gray-900 dark:text-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 backdrop-filter backdrop-blur-lg shadow ${
          visible
            ? "top-0 transition duration-500"
            : "transform -translate-y-96 transition duration-1000 delay-500"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="py-2">
                <svg
                  viewBox="0 0 697 697"
                  className="h-10 w-10 text-black dark:text-white fill-current"
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path d="M408.11 346.06h-87.8v-47.74l-.59.74-78.3 98.59H231.2L154.87 297.6v178.58H97.9V220.53h65.37l74.5 98.24 74.87-98.24h64.64v117.8h20.18l10.65 7.73z" />
                      <path d="M599.1 220.82v255.64h-65.37l-74.5-98.23-74.87 98.23h-64.64V371.37h-20.66l-10.65-7.73h88.28v35.04l.59-.74 78.3-98.59h10.22l76.33 100.05V220.82h56.97z" />
                      <path d="M348.5 697A348.58 348.58 0 01212.84 27.4a348.58 348.58 0 01271.32 642.2A346.32 346.32 0 01348.5 697zm0-657C178.39 40 40 178.39 40 348.5S178.39 657 348.5 657 657 518.61 657 348.5 518.61 40 348.5 40z" />
                    </g>
                  </g>
                </svg>
              </Link>
            </div>
            <div className="flex items-center justify-end">
              <div className="hidden md:block mr-4">
                <div className="ml-10 flex">
                  <NavLink to="/" text="Home" />
                  <NavLink to="/about" text="About" />
                  <NavLink to="/blog" text="Posts" />
                  <NavLink to="/reads" text="Reading List" />
                </div>
              </div>

              <ThemeToggle />

              <div className="-mr-2 flex items-center md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="inline-flex items-center ml-2 justify-center p-2 rounded-md text-gray-800 dark:text-gray-100 focus:outline-none"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="md:hidden" id="mobile-menu">
            <div className="px-4 pt-2 pb-3 flex flex-col">
              <NavLink to="/" text="Home" />
              <NavLink to="/about" text="About" />
              <NavLink to="/blog" text="Posts" />
              <NavLink to="/reads" text="Reading List" />
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;
