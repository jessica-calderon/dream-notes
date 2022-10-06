import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Profile from "./pages/Profile";
import SingleDream from "./pages/SingleDream";
import Signup from "./pages/Signup";
import "./index.css";

const httpLink = createHttpLink({
  uri: `/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex">
          <Header />
          <div className="container mb-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dream/:id" element={<SingleDream />} />
              <Route path="/dream" element={<SingleDream />} />

              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </div>
        <Footer className="mt-5 mb-0" />
      </Router>
    </ApolloProvider>
  );
}

export default App;
