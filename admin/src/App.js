import './App.css';
import React from 'react';
import ResponsiveDrawer from './Dashboard/Layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import custumor from './Dashboard/custumor';
import provider from './Dashboard/provider';
import verification from './Dashboard/VerificationProvider';

function App() {
  return (
    <div className="App">
      <Router>
        <ResponsiveDrawer />
        <Switch>
          <Route path="/custumors" component={custumor} />
          <Route path="/providers" component={provider} />
          <Route path="/verification" component={verification} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
