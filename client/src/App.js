import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Createacount from './components/createacount';
import Profile from './components/profile';
import axios from 'axios';
import { useState, useEffect } from "react";
import Reminder from "./components/reminder";

// axios.defaults.baseURL = 'http://localhost:3002'; 

function App() {



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/createacount" element={<Createacount />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/reminder" element={<Reminder />} />
          {/* <h1>{message}</h1> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
