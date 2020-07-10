import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx';
import { Profile } from './pages/Profile.jsx';
import { Alert } from './components/Alert';
import { AlertState } from './context/alert/alertState';
import { GithubState } from './context/github/githubState';
import { UserFollowers } from './pages/UserFollowers';
import { UserFollowing } from './pages/UserFollowing'

// import classes from './index.module.scss'

function App() {
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <Navbar/>
          <div className="container pt-4">
            <Alert alert={{ text: 'Test alert' }} />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/profile/:name/followers" component={UserFollowers} />
              <Route path="/profile/:name/following" component={UserFollowing} />
              <Route path="/profile/:name" component={Profile} />
            </Switch>
          </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
}

export default App;
