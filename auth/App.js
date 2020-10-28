import React from "react";
import { HashRouter, Route } from "react-router-dom";
import SignIn from "./SignIn";

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          {
            document.getElementById('header-auth-navbar') &&
              <Navbar className="site-header__user" domNodeId="header-auth-navbar" />
          }
          <Route exact path="/signin" component={SignIn} />
        </div>
      </HashRouter>
    );
  }
}
