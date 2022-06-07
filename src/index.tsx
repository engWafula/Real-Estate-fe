// import React from 'react';
import { render } from "react-dom";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache,createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import App from './App';
import "./styles/index.css";
import reportWebVitals from "./reportWebVitals";


const httpLink = createHttpLink({
  uri: '/api'
});



const authLink = setContext((request, { headers }) => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      "X-CSRF-TOKEN": token || ""
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),

});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
