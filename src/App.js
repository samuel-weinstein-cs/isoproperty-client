import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { loginUser, verifyUser } from "./services/api_helper";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import About from "./components/About.js";
import Home from "./components/Home.js";
import Listings from "./components/Listings.js";
import SingleListing from "./components/SingleListing.js";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  handleLogin = async loginData => {
    const currentUser = await loginUser(loginData);
    this.setState({ currentUser });
  };

  handleLogout = () => {
    this.setState({
      currentUser: null
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
  };

  async componentDidMount () {

    if (await verifyUser()) {
      const name = localStorage.getItem("name");
      const id = localStorage.getItem("id");
      const user = { name, id };
      user &&
        this.setState({
          currentUser: user
        });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="content">
          <Switch>
            <Route path="/admin">
              <Header
                pages={[
                  {
                    url:"/admin/agents",
                    text:"Agents",
                  },
                  {
                    url:"/admin/listings",
                    text:"Listings",
                  },
                  {
                    url:"/admin/about",
                    text:"About",
                  },
                  {
                    url:"/",
                    text: this.state.currentUser ? "Log out" : "Home",
                    onClick: this.handleLogout
                  },
                ]}
                />
            </Route>
            <Route path="/">
              <Header
                pages={[
                  {
                    url:"/",
                    text:"Home",
                  },
                  {
                    url:"/listings",
                    text:"Listings",
                  },
                  {
                    url:"/about",
                    text:"About",
                  },
                  this.state.currentUser ?
                  {
                    url:"/admin",
                    text:"Admin",
                  } :
                  {
                    url: "/admin",
                    text:"Log In",
                  },

                ]}
                />
            </Route>
          </Switch>


          <main>
            <Switch>

              <Route
                path="/admin"
                render={(props) =>
                  <Admin
                    {...props}
                    user={this.state.currentUser}
                    handleLogin={this.handleLogin}
                    />
                }
                />

              <Route exact path="/">
                <Home />
              </Route>

              <Route
                path="/listings/:id"
                render={props => <SingleListing id={props.match.params.id} />}
              />

              <Route path="/listings">
                <Listings />
              </Route>

              <Route path="/about">
                <About />
              </Route>

            </Switch>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
