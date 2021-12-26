import React, { useState, useEffect } from 'react';
import './ScoreboardTotal.css';

function ScoreboardTotal (props) {

  let [total,setTotal] = useState([]);
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
    console.log("calculate");
    console.log(scoreData);
    scoreData.map((row,i) => {
      row.map((col,j) => {
        arr[j] = total[j] + +col; 
      })
      setTotal(arr);
    }) 
  }

  console.log(total);

return (
  <tr className='table-danger'>
    {
      total.map((val,i) => {
        return <td className='all-border text-center'>{val}</td>
      }) 
    }
  </tr>
);
}

export default ScoreboardTotal;
