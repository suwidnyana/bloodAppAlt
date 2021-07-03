import React, { Component } from "react";
import { Provider } from "react-redux";

import Routes from "./src/screens/Route";
import configBlood from "./src/store/config";

export default class App extends Component {
  render() {
    const store = configBlood();

    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
