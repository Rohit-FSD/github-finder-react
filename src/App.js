import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";

class App extends React.Component {
  state = {
    users: [],
    loading: false,
    alertState: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    this.setState({ loading: false, users: data });
  }

  getSearchData = async (searchparam) => {
    this.setState({ loading: true });
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchparam}`
    );
    const data = await response.json();
    this.setState({ loading: false, users: data.items });
  };

  clearUserState = () => this.setState({ loading: false, users: [] });

  setAlertState = (msg, type) => {
    this.setState({ alertState: { msg, type } });
    setTimeout(() => {
      this.setState({ alertState: null });
    }, 5000);
  };

  render() {
    const { users, loading, alertState } = this.state;
    return (
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github"></Navbar>
        <div className="container">
          <Alert alertState={alertState}></Alert>
          <Search
            handleSearch={this.getSearchData}
            clearUsers={this.clearUserState}
            showClearBtn={!!users.length}
            setAlertState={this.setAlertState}
          ></Search>
          <Users users={users} loading={loading}></Users>
        </div>
      </div>
    );
  }
}

export default App;
