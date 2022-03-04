import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Gameinfo from './components/Gameinfo/Gameinfo';
import Scoreboard from './components/Scoreboard/Scoreboard';
import GameResult from './components/GameResult/GameResult';

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/info" element={<Gameinfo />} />
      <Route path="/scoreboard" element={<Scoreboard />} />
      <Route path="/result" element={<GameResult />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
