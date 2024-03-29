import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LOG_IN } from "./lib/graphql/mutations";
import { useMutation } from "@apollo/client";
import {StripeProvider,Elements} from "react-stripe-elements"
import {
  LogIn as LogInData,
  LogInVariables,
} from "./lib/graphql/mutations/LogIn/__generated__/LogIn";
import {
  AppHeader,
  Stripe,
  Listings,
  Home,
  Host,
  Listing,
  User,
  NotFound,
  Login,
} from "./sections";
import { Layout, Affix, Spin } from "antd";
import { Viewer } from "./lib/types";
import { AppHeaderSkeleton,ErrorBanner } from "./lib/components";




const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

function App() {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem("token", data.logIn.token);
        } else {
          sessionStorage.removeItem("token");
        }
      }
    },
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    return (
      <Layout className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Lanching Tusenguke......." />
        </div>
      </Layout>
    );
  }

  const logInErrorElement=error?<ErrorBanner description="We were unable to confirm whether you are logged in.Please try again later"/>:null;


  return (
    <StripeProvider apiKey={process.env.REACT_APP_S_PUBLISHABLE_KEY as string} >
    <Router>
      <Layout id="app">
        {logInErrorElement}
        <Affix offsetTop={0} className="app_affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact  path="/host" 
          render={(props)=><Host {...props}  viewer={viewer} />}
          />
          <Route
            exact
            path="/listing/:id"
            render={(props) =><Elements><Listing {...props} viewer={viewer} /></Elements> }
          />
          <Route exact path="/listings/:location?" component={Listings} />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setViewer={setViewer} />}
          />
          <Route exact path="/user/:id" 
          render={(props) => <User {...props} setViewer={setViewer} viewer={viewer} />}
          />
                <Route  exact path="/stripe" 
                     render={(props) => <Stripe {...props} viewer={viewer} setViewer={setViewer} />}
                />
        
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
    </StripeProvider>
  );
}

export default App;
