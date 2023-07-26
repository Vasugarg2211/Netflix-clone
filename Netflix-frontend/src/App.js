import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Netflix from "./pages/Netflix";
import Login from "./pages/Login";
import Player from "./pages/Player";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element = {<Netflix />} />
        <Route exact path="/player" element = {<Player />} />
        <Route exact path="/login" element = {<Login />} />
        <Route exact path="/signup" element = {<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;