import React from "react";
import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./component/UI/Navbar/Navbar";
import AppRouter from "./component/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
