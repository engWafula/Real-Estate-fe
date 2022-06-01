import React from "react";
import { Card, Layout, Spin, Typography } from "antd";

import googleLogo from "./assets/google_logo.jpg";

const { Content } = Layout;
const { Text, Title } = Typography;

export function Login() {
  return (
    <Content className="log-in">
      <Card className="log-in-card">
        <div className="log-in-card__intro">
           <Title level={3} className="log-in-card__intro-title">
             <span role="img" aria-label="wave">Welcome To Tusenguke</span>
             </Title>

             <Title level={3} className="log-in-card__intro-title">
             Log in To Continue
             </Title>
             <Text>Sign in with Google to start booking the available Rentals,Apartments etc</Text>
        </div>
        <button className="log-in-card__google-button ">
          <img src={googleLogo} alt="google" className="log-in-card__google-button-logo" />
          <span className="log-in-card__google-button-text">
            Sign in With Google
          </span>
        </button>
        <Text type="secondary">
          Note: By signing in, you'll be redirected to the Google consent form to sign in
          with your Google account.
        </Text>
      </Card>
    </Content>
  );
}
