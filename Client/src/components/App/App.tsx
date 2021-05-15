import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./styles.module.css";

import { Provider } from "react-redux";
import { store } from "../../store";

import Chats from "../../pages/chats/Chats";
import Settings from "../../pages/settings/Settings";
import Contacts from "../../pages/contacts/Contacts";
import ChatItem from "../ChatItem/ChatItem";
import Login from "../../pages/login/Login";

function App() {
  const [token, setToken] = useState();
  useEffect(() => {
    if (token) {

    }

  });
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <main className={styles.container}>
          <Switch>
            <Route path="/login" component={Login} />
            <Navigation />
            <div className={styles.routerDesktop}>
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
            </div>
            <div className={styles.routerMobile}>
              <Switch>
                <Route path="/chats" component={Chats} exact />
                <Route path="/chats/:id" component={ChatItem} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/settings" component={Settings} />

                <Redirect to="/chats" />
              </Switch>
            </div>
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
