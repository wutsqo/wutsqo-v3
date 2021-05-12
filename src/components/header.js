import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import tw from "twin.macro";

const NavButton = tw.div`mx-3`;

const Header = ({ siteTitle }) => (
  <header>
    <div className="px-4 py-6 max-w-screen-lg mx-auto flex justify-between">
      <div className="flex justify-items-start">
        <NavButton>
          <Link to="/">Home</Link>
        </NavButton>
      </div>
      <div className="flex justify-items-end">
        <NavButton>
          <Link to="/blog">Blog</Link>
        </NavButton>
        <NavButton>
          <Link to="/reads">Reading List</Link>
        </NavButton>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
