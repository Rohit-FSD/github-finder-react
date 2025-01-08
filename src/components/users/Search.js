import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  state = {
    text: "",
  };

  onChange = (e) => this.setState({ text: e.target.value });

  //If we have single input use above
  //Else
  //onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.text)
      this.props.setAlertState("Please enter something", "light");
    else {
      this.props.handleSearch(this.state.text);
      this.setState({ text: "" });
    }
  };

  onClearAction = () => this.props.clearUsers();

  render() {
    const IS_DISABLED = !this.state.text;
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
            // disabled={IS_DISABLED}
            style={{ cursor: IS_DISABLED && "not-allowed" }}
          />
        </form>
        {this.props.showClearBtn && (
          <button
            className="btn btn-light btn-block"
            onClick={this.onClearAction}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired,
  setAlertState: PropTypes.func.isRequired,
};

export default Search;
