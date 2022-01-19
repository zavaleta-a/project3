import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Info from "./pages/Info";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import OrderHistory from "./pages/OrderHistory";

import store from "./utils/store";
import { Provider } from "react-redux";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Provider store={store}>
            <div className="splash-container">
            <Cart />
            <Nav />
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/parts/:id" component={Info} />
            </Switch>
            <div className="splash">
              <h1 className="splash-head">Welcome to Parts R Us! </h1>
              <p className="splash-subhead">
                Click to view current automotive parts.
              </p>
              <p>
                <a href="/login" className="pure-button pure-button-primary">Start</a>
              </p>
            </div>
          </div>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
