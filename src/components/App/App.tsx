import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./styles.module.css";

import { Provider } from "react-redux";
import { store } from "../../store";

import Chats from "../../pages/chats/Chats";
import Settings from "../../pages/settings/Settings";
import Contacts from "../../pages/contacts/Contacts";
import ChatItem from "../ChatItem/ChatItem";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main className={styles.container}>
          <Navigation />
          <Switch>
            <Route path="/chats">
              <Chats />
              <Switch>
                <Route path="/chats/:id" component={ChatItem} />
              </Switch>
            </Route>
            <Route path="/contacts" component={Contacts} />
            <Route path="/settings" component={Settings} />

            <Redirect to="/chats" />
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
