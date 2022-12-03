import React, { Component } from "react";
import Home from "./components/Home";
import Show from "./components/Show";
import { BrowserRouter , Routes, Route, Link } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <div className="">
        <Routes>
          <Route  exact path="/" element={<Home/>} />
          <Route exact path="/show" element={<Show/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;