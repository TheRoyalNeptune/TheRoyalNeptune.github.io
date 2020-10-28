import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import auth from "./gotrue";
import withCurrentUser from "./withCurrentUser";
import qs from 'qs';

@withCurrentUser

export default class Navbar extends React.Component {
  handleLogout() {
    this.props.currentUser.logout()
      .then(() => {
        document.location = "/";
      });
  }

  renderContent() {
    const { currentUser } = this.props;

    if (currentUser) {
      return (
        <div className="">
          <a href="/seasons" className="main-navigation__item">
            Seasons
          </a>
          <span className=""> Welcome, {currentUser.email} </span>
          <Link to="/" onClick={this.handleLogout.bind(this)} className="main-navigation__item__auth">
            Logout
          </Link>
        </div>
      );
    }

    return (
      <div className="">
        <Link to="/signin" className="main-navigation__item__auth">
          SignIn
        </Link>
      </div>
    );
  }

  render() {
    return ReactDOM.createPortal(
      this.renderContent(),
      document.getElementById(this.props.domNodeId)
    );
  }
}
