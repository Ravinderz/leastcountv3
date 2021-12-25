import React, { useState } from 'react';
import ScoreboardHeader from '../ScoreboardHeader/ScoreboardHeader';
import ScoreboardRow from '../ScoreboardRow/ScoreboardRow';
import './Scoreboard.css';
import { Table } from 'react-bootstrap';
import ScoreboardTotal from '../ScoreboardTotal/ScoreboardTotal';

function Scoreboard(props) {

  let gameInfoStore = JSON.parse(localStorage.getItem('gameInfo'));

  let [players, setPlayers] = useState(gameInfoStore.players);
  console.log(players);
  let [scoreData, setScoreData] = useState([]);
  let [gameInfo,setGameInfo] = useState(gameInfoStore);
  console.log(gameInfo);

  const updateScore = (data) => {
    let score = [...scoreData];
    score.push(data);
    setScoreData(score);
  }

  return (
    <div className="Scoreboard">
      <Table striped bordered hover responsive className='table caption-top'>
      <caption>
        <span className='float-start'>Game name : {gameInfo.gameName}</span>
        <span className='float-end'>Game Score : {gameInfo.gameScore}</span>
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
                    return <td key={col + j}>
                      {col}
                    </td>
                  })
                }
              </tr>
            })
          }
          <ScoreboardTotal players={players} scoreData={scoreData} />
          <ScoreboardRow players={players} updateScore={updateScore}/>
        </tbody>
      </Table>
    </div>
  );
}

export default Scoreboard;
