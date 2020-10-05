import React from "react";
import "App.css";
import Navigation from "Shared/Navigation";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CategoryList from "components/Category/CategoryList";
import ProductList from "components/Product/ProductList";
import Dashboard from "Shared/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/Dashboard" exact component={Dashboard} />
          <Route path="/Category" component={CategoryList} />
          <Route path="/Product" component={ProductList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
