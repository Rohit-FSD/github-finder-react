import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ setAlertState, handleSearch, showClearBtn, clearUsers }) => {
  const [text, setText] = useState("");

  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) setAlertState("Please enter something", "light");
    else {
      handleSearch(text);
      setText("");
    }
  };

  const onClearAction = () => clearUsers();

  const IS_DISABLED = !text;

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
          // disabled={IS_DISABLED}
          style={{ cursor: IS_DISABLED && "not-allowed" }}
        />
      </form>
      {showClearBtn && (
        <button className="btn btn-light btn-block" onClick={onClearAction}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired,
  setAlertState: PropTypes.func.isRequired,
};

export default Search;
