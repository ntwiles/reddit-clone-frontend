import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Footer } from "react-bulma-components";

import './App.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

import { HeaderBar } from './components/HeaderBar';

import { HomeContainer } from './containers/HomeContainer';
import { PostContainer } from './containers/PostContainer';
import { ForumContainer } from './containers/ForumContainer';
import { CreatePostContainer } from './containers/CreatePostContainer';
import { CreateForumContainer } from './containers/CreateForumContainer';

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
            <Route path="/f/:forumName" component={ForumContainer}/>
            <Route path="/p/:postId" component={PostContainer} />
            <Route exact path="/create-post" component={CreatePostContainer} />
            <Route exact path="/create-forum" component={CreateForumContainer} />
            <Route exact path="/" component={HomeContainer} />
            <Route path="/:sortMethod" component={HomeContainer} />

          </Switch>
        </Router>
        <Footer className="mt-2"/>
      </div>
    </ApolloProvider>
  );
}

export default App;
