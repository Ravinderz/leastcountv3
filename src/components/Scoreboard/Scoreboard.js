import React, { useEffect, useRef, useState } from 'react';
import ScoreboardHeader from '../ScoreboardHeader/ScoreboardHeader';
import ScoreboardRow from '../ScoreboardRow/ScoreboardRow';
import './Scoreboard.css';
import { Table, Alert, Button, Modal, Form , Col, Row } from 'react-bootstrap';
import ScoreboardTotal from '../ScoreboardTotal/ScoreboardTotal';

function Scoreboard(props) {

  let gameInfoStore = JSON.parse(localStorage.getItem('gameInfo'));
  const totalRef = useRef(null);

  let [players, setPlayers] = useState(gameInfoStore.players);
  let [scoreData, setScoreData] = useState([]);
  let [gameInfo, setGameInfo] = useState(gameInfoStore);
  let [show, setShow] = useState(false);
  let [total, setTotal] = useState([]);
  let [strikeThrough, setStrikeThrough] = useState([]);
  let [playerName, setPlayerName] = useState('');
  const [displayModal, setDisplayModal] = useState(false);

  const handleClose = () => setDisplayModal(false);
  const handleShow = () => setDisplayModal(true);


  useEffect(() => {
    updateStrikeThrough();
  }, [players,displayModal]);

  const updateTotal = () =>{
    if(scoreData.length === 0 ){
      totalRef.current.initializeTotal();
    }else{
      let score = [...scoreData];
      console.log(total);
      let max = total[0];
      let index = 0;
      for(var i = 0; i < total.length; i++){
        if(total[i] > max){
          index = i;
        }
      }
      let newScore = [];
      score.map((row,i) =>{
        let newRow = row;
        newRow.push(row[index]);
        newScore.push(newRow);
      });
     console.log(newScore);
     setScoreData(newScore);
    }
    
  }

  const updateScore = (data) => {
    let score = [...scoreData];
    score.push(data);
    setScoreData(score);
    console.log(scoreData);
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



  const addPlayer = (e) => {
    e.preventDefault();
    let obj = {name : playerName}
    let arr = [...players];
    arr.push(obj);
    setPlayers(arr);
    localStorage.setItem('players',JSON.stringify(arr));
    updateTotal();
    setDisplayModal(false);
  }

  return (
    <div className="Scoreboard d-flex justify-content-center flex-wrap">
      <Table striped bordered hover responsive className='table caption-top flex-fill'>
        <caption>
          <span className='float-start ms-3'>Game name : {gameInfo.gameName}</span>
          <span className='float-end me-3'>Game Score : {gameInfo.gameScore}</span>
          <span className='float-end me-3'>
            <Button variant="primary" type="submit" className='mt-3 me-3 width-100' onClick={handleShow}>
              Add Player
            </Button>
          </span>
        </caption>
        <thead className='table-dark table-header-sticky' scope="col">
          <ScoreboardHeader players={players} />
        </thead>
        <tbody>
          {
            scoreData.map((row, i) => {
              return <tr key={i}>
                {
                  row.map((col, j) => {
                    return <td key={col + j +players[j]} className={'text-center ' + (strikeThrough[j] ? 'text-decoration-line-through' : '')}>
                      {col}
                    </td>
                  })
                }
              </tr>
            })
          }
          <ScoreboardTotal ref={totalRef} players={players} scoreData={scoreData} setTotal={setTotal} />
          <ScoreboardRow players={players} updateScore={updateScore} updateShow={updateShow} dismissShow={dismissShow} total={total} gameScore={gameInfo.gameScore} updateStrikeThrough={updateStrikeThrough} />
        </tbody>
      </Table>
      {show ?
        <Alert variant="danger">
          <Alert.Heading>Enter a valid value between 0 & 40!</Alert.Heading>
        </Alert>
        : <></>}

      <Modal show={displayModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="width-40">
            <Row className='mb-2 align-items-center'>
              <Col className='mb-2'>
                <Form.Control placeholder="Player Name" value={playerName} onChange={e => setPlayerName(e.target.value)} />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPlayer}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Scoreboard;
