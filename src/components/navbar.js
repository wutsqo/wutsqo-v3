import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "gatsby";
import ThemeToggle from "./themetoggle";
import { debounce, throttle } from "throttle-debounce";

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
        className={`fixed w-full z-50 bg-white text-gray-900 dark:text-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-100 backdrop-filter backdrop-blur-lg shadow ${
          visible
            ? "top-0 transition duration-500"
            : "transform -translate-y-96 transition duration-1000 delay-500"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="py-2 rounded-md text-lg no-underline">
                Home
              </Link>
            </div>
            <div className="flex items-center justify-end">
              <div className="hidden md:block mr-4">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/about"
                    className=" px-3 py-2 rounded-md  text-lg no-underline"
                  >
                    About
                  </Link>

                  <Link
                    to="/blog"
                    className=" px-3 py-2 rounded-md  text-lg no-underline"
                  >
                    Blog
                  </Link>

                  <Link
                    to="/reads"
                    className=" px-3 py-2 rounded-md text-lg no-underline"
                  >
                    Reading List
                  </Link>
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-lg no-underline"
              >
                About
              </Link>

              <Link
                to="/blog"
                className="block px-3 py-2 rounded-md text-lg no-underline"
              >
                Blog
              </Link>

              <Link
                to="/reads"
                className="block px-3 py-2 rounded-md text-lg no-underline"
              >
                Reading List
              </Link>
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;
