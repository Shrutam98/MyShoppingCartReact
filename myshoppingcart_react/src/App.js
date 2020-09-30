import React from 'react';
import './App.css';
import Navigation from './components/Navigation'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import ProductList from './components/ProductList';
import CategoryList from './components/CategoryList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path='/' exact component={Navigation} />
          <Route path='/Category' component={CategoryList} />
          <Route path='/Product' component={ProductList} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
