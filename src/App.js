import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";

//import pizzas from './assets/pizza/pizzas.json'

import "./scss/app.scss";
import { Helmet } from "react-helmet";

export const AppContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <>
      <Helmet>
        <title>Pizza app</title>
        <meta name="description" content="Order pizzas" />
        <meta name="keywords" content="pizza, order, food" />
      </Helmet>
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="App">
          <div className="wrapper">
            <div className="content">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
