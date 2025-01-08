import React from "react";
import { PropTypes } from "prop-types";

const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i style={{ marginRight: "6px" }} className={icon}></i>
        {title}
      </h1>
    </nav>
  );
};

Navbar.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Navbar;
