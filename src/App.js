import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./components/pages/About";
import User from "./components/users/User";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState(null);

  const getInitialUsers = async () => {
    setLoading(true);
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    getInitialUsers();
  }, []);

  const getSearchData = async (searchparam) => {
    setLoading(true);
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchparam}`
    );
    const data = await response.json();
    setLoading(false);
    setUsers(data.items);
  };

  const getUser = async (userName) => {
    setLoading(true);
    const response = await fetch(`https://api.github.com/users/${userName}`);
    const data = await response.json();
    setLoading(false);
    setUser(data);
  };

  const getUserRepos = async (userName) => {
    setLoading(true);
    const response = await fetch(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc`
    );
    const data = await response.json();
    setLoading(false);
    setRepos(data);
  };

  const clearUserState = () => {
    setLoading(false);
    setUsers([]);
  };

  const showAlert = (msg, type) => {
    setAlertState({ msg, type });
    setTimeout(() => {
      setAlertState(null);
    }, 5000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github"></Navbar>
        <div className="container">
          <Alert alertState={alertState}></Alert>
          <Routes>
            <Route
              path="/"
              element={
                <Fragment>
                  <Search
                    handleSearch={getSearchData}
                    clearUsers={clearUserState}
                    showClearBtn={!!users.length}
                    setAlertState={showAlert}
                  ></Search>
                  <Users users={users} loading={loading}></Users>
                </Fragment>
              }
            ></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route
              path="/user/:login"
              element={
                <User
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                ></User>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;
