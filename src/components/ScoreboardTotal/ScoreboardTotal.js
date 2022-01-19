import React, { useState, useEffect,forwardRef,useImperativeHandle } from 'react';
import './ScoreboardTotal.css';

function ScoreboardTotal(props,ref) {

  let [total, setTotal] = useState([]);
  let scoreData = props.scoreData;
  let players = props.players;
  
  let arr = [];

  useImperativeHandle(ref, () => ({
    initializeTotal () {
      let arr = [];
      console.log("called")
      console.log(players);
      let newPlayers = JSON.parse(localStorage.getItem('players'));
      console.log(newPlayers);
      newPlayers.forEach(element => {
        arr.push(parseInt(0,10));
      });
      setTotal(arr);
    }

  }), [])

  useEffect(() => {
    let newPlayers = JSON.parse(localStorage.getItem('players'));
    if(newPlayers && newPlayers.length > players.length){
      newPlayers.forEach(element => {
        arr.push(parseInt(0,10));
      });
      setTotal(arr);
    }else{
      initializeTotal();
    }
    
    console.log(scoreData);
    calculateTotal();
  }, [scoreData]);

  const initializeTotal = () => {
    players.forEach(element => {
      arr.push(parseInt(0,10));
    });
    setTotal(arr);
  }

  const initializeNewTotal = () => {
    let newPlayers = JSON.parse(localStorage.getItem('players'));
    if(newPlayers && newPlayers.length > players.length){
      newPlayers.forEach(element => {
        arr.push(parseInt(0,10));
      });
    }
      setTotal(arr);
  }

  const calculateTotal = () => {
    initializeNewTotal();
    console.log(scoreData);
    console.log(total);
    scoreData.map((row, i) => {
      row.map((col, j) => {
        if (col && col === 'XX') {
          arr[j] = parseInt(arr[j],10) + parseInt(0,10);
        } else {
          arr[j] = parseInt(arr[j],10) + parseInt(col,10);
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
          return <td className='all-border text-center' key={val + i + Math.random()}>{val}</td>
        })
      }
    </tr>
  );
}

export default forwardRef(ScoreboardTotal);
