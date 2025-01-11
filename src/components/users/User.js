import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";

const User = ({ getUser, getUserRepos, user, repos, loading }) => {
  const { login: username } = useParams();

  useEffect(() => {
    getUser(username);
    getUserRepos(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !user || !Object.keys(user).length) return <Spinner />;

  const {
    name,
    avatar_url,
    location,
    bio,
    login,
    html_url,
    followers,
    following,
    public_repos,
    hireable,
    blog,
    company,
  } = user;

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-centre">
          <img
            src={avatar_url}
            alt=""
            className="round-img"
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit GitHub profile
          </a>
          <ul>
            <li>{login && <strong>Username: {login}</strong>}</li>
            <li>{company && <strong>Company: {company}</strong>}</li>
            <li>
              {blog && (
                <strong>
                  Website: <a href={`https://${blog}`}>{blog}</a>
                </strong>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="car text-centre">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public repos: {public_repos}</div>
        <div className="badge badge-dark">Public gists: {public_repos}</div>
      </div>
      <Repos repos={repos}></Repos>
    </Fragment>
  );
};

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  repos: PropTypes.array,
  getUserRepos: PropTypes.func.isRequired,
};

export default User;
