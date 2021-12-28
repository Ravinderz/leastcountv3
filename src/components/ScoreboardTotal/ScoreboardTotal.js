import React, { useState, useEffect } from 'react';
import './ScoreboardTotal.css';

function ScoreboardTotal(props) {

  let [total, setTotal] = useState([]);
  let scoreData = props.scoreData;
  let players = props.players;
  let arr = [];

  useEffect(() => {
    initializeTotal();
    calculateTotal();
  }, [scoreData]);

  const initializeTotal = () => {
    players.forEach(element => {
      arr.push(0);
    });
    setTotal(arr);
  }

  const calculateTotal = () => {
    scoreData.map((row, i) => {
      row.map((col, j) => {
        if (col && col === 'XX') {
          arr[j] = total[j] + +0;
        } else {
          arr[j] = total[j] + +col;
        }
      })
      setTotal(arr);
      props.setTotal(arr);
    })
  }
  return (
    <tr className='table-danger' >
      {
        total.map((val, i) => {
          return <td className='all-border text-center' key={val + i}>{val}</td>
        })
      }
    </tr>
  );
}

export default ScoreboardTotal;
