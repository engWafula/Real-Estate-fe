import React from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import {Listings,Home,Host,Listing,User,NotFound,Login} from './sections';

function App() {
  return (
  <Router>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/host' component={Host}/>
      <Route exact path='/listing/:id' component={Listing}/>
      <Route exact path='/listings/:location?' component={Listings}/>
      <Route exact path='/user/:id' component={User}/>
      <Route exact path='/login' component={Login}/>
      <Route  component={NotFound}/>
    </Switch>
  </Router>
  );
}

export default App;
