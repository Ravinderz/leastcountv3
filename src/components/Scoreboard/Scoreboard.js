import React, { useEffect, useState } from 'react';
import ScoreboardHeader from '../ScoreboardHeader/ScoreboardHeader';
import ScoreboardRow from '../ScoreboardRow/ScoreboardRow';
import './Scoreboard.css';
import { Table, Alert } from 'react-bootstrap';
import ScoreboardTotal from '../ScoreboardTotal/ScoreboardTotal';

function Scoreboard(props) {

  let gameInfoStore = JSON.parse(localStorage.getItem('gameInfo'));

  let [players, setPlayers] = useState(gameInfoStore.players);
  console.log(players);
  let [scoreData, setScoreData] = useState([]);
  let [gameInfo, setGameInfo] = useState(gameInfoStore);
  let [show, setShow] = useState(false);
  let [total, setTotal] = useState([]);
  let [strikeThrough, setStrikeThrough] = useState([]);

  useEffect(() => {
    updateStrikeThrough();
  }, []);

  const updateScore = (data) => {
    let score = [...scoreData];
    score.push(data);
    setScoreData(score);
  }

  const updateShow = () => {
    setShow(true);
  }

  const dismissShow = () => {
    setShow(false);
  }

  const updateStrikeThrough = () => {
    let arr = [];
    players.forEach(element => {
      arr.push(false);
    });
    setStrikeThrough(arr)
  }

  return (
    <div className="Scoreboard d-flex justify-content-center flex-wrap">
      <Table striped bordered hover responsive className='table caption-top flex-fill'>
        <caption>
          <span className='float-start ms-3'>Game name : {gameInfo.gameName}</span>
          <span className='float-end me-3'>Game Score : {gameInfo.gameScore}</span>
        </caption>
        <thead className='table-dark'>
          <ScoreboardHeader players={players} />
        </thead>
        <tbody>
          {
            scoreData.map((row, i) => {
              return <tr key={i}>
                {
                  row.map((col, j) => {
                    return <td key={col + j} className={'text-center ' + (strikeThrough[j] ? 'text-decoration-line-through' : '')}>
                      {col}
                    </td>
                  })
                }
              </tr>
            })
          }
          <ScoreboardTotal players={players} scoreData={scoreData} setTotal={setTotal} />
          <ScoreboardRow players={players} updateScore={updateScore} updateShow={updateShow} dismissShow={dismissShow} total={total} gameScore={gameInfo.gameScore} updateStrikeThrough={updateStrikeThrough} />
        </tbody>
      </Table>
      {show ?
        <Alert variant="danger">
          <Alert.Heading>Enter a valid value between 0 & 40!</Alert.Heading>
        </Alert>
        : <></>}
    </div>
  );
}

export default Scoreboard;
