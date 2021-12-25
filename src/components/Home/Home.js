import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home () { 
  return (
  <div className="Home">
    <Link to="info" className="btn btn-primary">Start</Link>
  </div>
  )

}

export default Home;
