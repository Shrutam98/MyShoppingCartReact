import React from 'react';
import './App.css';
import Category from './components/Category';
import Navigation from './components/Navigation'
import Product from './components/Product'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'

function App() {
  return (
    <div className="App">
      {/* <Navigation /> */}
      {/* <Category /> */}
     
      <BrowserRouter>
        <Navigation />
          <Switch>
            <Route path = '/' exact component = {Navigation} />
            <Route path = '/Category'
             component = { Category} />
            <Route path = '/Product' component = {Product} />
          </Switch>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
