import React from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import {Listings,Home,Host,Listing,User,NotFound,Login} from './sections';
import { Layout } from "antd";

function App() {
  return (
  <Router>
    <Layout id='app'>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/host' component={Host}/>
      <Route exact path='/listing/:id' component={Listing}/>
      <Route exact path='/listings/:location?' component={Listings}/>
      <Route exact path='/user/:id' component={User}/>
      <Route exact path='/login' component={Login}/>
      <Route  component={NotFound}/>
    </Switch>
    </Layout>
  </Router>
  );
}

export default App;
