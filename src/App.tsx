import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  AppHeader,
  Listings,
  Home,
  Host,
  Listing,
  User,
  NotFound,
  Login,
} from "./sections";
import { Layout,Affix } from "antd";
import { Viewer } from "./lib/types";



const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

function App() {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  console.log(viewer);
  
  return (
    <Router>
      <Layout id="app">
        <Affix offsetTop={0} className="app_affix-header">
        <AppHeader viewer={viewer} setViewer={setViewer}/>
        </Affix>
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/host" component={Host} />
          <Route path="/listing/:id" component={Listing} />
          <Route path="/listings/:location?" component={Listings} />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setViewer={setViewer} />}
          />
          <Route exact path="/user/:id" component={User} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
