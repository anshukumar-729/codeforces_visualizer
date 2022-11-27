import React, { Component } from "react";
import Home from "./components/Home";
import { BrowserRouter , Routes, Route, Link } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <div className="max-w-screen-md mx-auto pt-20">
        <Routes>
          <Route exact path="/" element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;