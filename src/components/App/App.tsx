import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./styles.module.css";

import Chats from "../../pages/chats/Chats";
import Settings from "../../pages/settings/Settings";
import Contacts from "../../pages/contacts/Contacts";

function App() {
  return (
    <BrowserRouter>
      <main className={styles.container}>
        <Navigation />
        <Switch>
          <Route path="/chats" component={Chats} />
          <Route path="/settings" component={Settings} />
          <Route path="/contacts" component={Contacts} />
          <Redirect to="/chats" />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
