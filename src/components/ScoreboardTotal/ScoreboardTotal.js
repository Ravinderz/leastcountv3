import React, { useState, useEffect } from 'react';
import './ScoreboardTotal.css';

function ScoreboardTotal(props) {

  let [total, setTotal] = useState([]);
  let scoreData = props.scoreData;
  let players = props.players;
  let arr = [];

  useEffect(() => {
    initializeTotal();
    console.log(scoreData);
    calculateTotal();
  }, [scoreData]);

  const initializeTotal = () => {
    players.forEach(element => {
      arr.push(parseInt(0,10));
    });
    setTotal(arr);
  }

  const calculateTotal = () => {
    scoreData.map((row, i) => {
      row.map((col, j) => {
        if (col && col === 'XX') {
          arr[j] = parseInt(total[j],10) + parseInt(0,10);
        } else {
          arr[j] = parseInt(total[j],10) + parseInt(col,10);
        }
      })
      setTotal(arr);
      props.setTotal(arr);
    })
  }
  return (
    <tr className='table-danger' key={Math.random()}>
      {
        total.map((val, i) => {
          return <td className='all-border text-center' key={val + i}>{val}</td>
        })
      }
    </tr>
  );
}

export default ScoreboardTotal;
