import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./styles.module.css";

import Dialogs from "../../pages/dialogs/Dialogs";
import Settings from "../../pages/settings/Settings";
import User from "../../pages/user/User";

function App() {
  return (
    <BrowserRouter>
      <main className={styles.container}>
        <Navigation />
        <Switch>
          <Route path="/dialogs" component={Dialogs} />
          <Route path="/settings" component={Settings} />
          <Route path="/user" component={Settings} />

          <Redirect to="/dialogs" />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
