import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/';

import ViewReviews from './pages/view-reviews';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route
            path="/view-reviews/:professorId"
            render={(routeProps) => <ViewReviews {...routeProps} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
