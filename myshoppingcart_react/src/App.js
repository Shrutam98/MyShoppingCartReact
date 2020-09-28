import React from 'react';
import './App.css';
import Category from './components/Category';
import Navigation from './components/Navigation'
import Product from './components/Product'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import ProductList from './components/ProductList';
import CategoryList from './components/CategoryList';

function App() {
  return (
    <div className="App">
      {/* <Navigation /> */}
      {/* <Category /> */}

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
