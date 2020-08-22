import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Footer } from "react-bulma-components";

import './App.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

import { HeaderBar } from './components/HeaderBar';
import { HomeView } from './views/HomeView';
import { PostView } from './views/PostView';
import { ForumView } from './views/ForumView';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <HeaderBar/>
          <Switch>
            <Route path="/f/:forumName" component={ForumView}/>
            <Route path="/about">
              About
            </Route>
            <Route path="/users">
              Users
            </Route>
            <Route path="/post/:postId" component={PostView} />
            <Route exact path="/" component={HomeView} />
            <Route path="/:sortMethod" component={HomeView} />
          </Switch>
        </Router>
        <Footer className="mt-2"/>
      </div>
    </ApolloProvider>
  );
}

export default App;
