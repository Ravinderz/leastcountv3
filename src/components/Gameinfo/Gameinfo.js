import React, { useState } from 'react';
import './Gameinfo.css';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button} from 'react-bootstrap';

function Gameinfo() {

  let navigate = useNavigate();

  let [gameScore, setGameScore] = useState(0);
  let [gameName, setGameName] = useState("");
  let [bool, setBool] = useState(false);

  const [inputList, setInputList] = useState([{ name: "" }]);

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    canContinue();
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { name: "" }]);
    canContinue();
  };

  const handleInputChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    canContinue();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let gameInfo = { gameScore: gameScore, gameName: gameName, players: inputList }
    localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
    navigate(`/scoreboard`);
  }

  const canContinue = () => {
    if((gameName && gameName !== null) && (gameScore && gameScore !== null) && (inputList && inputList.length >=2)){
      setBool(true);
    }
  }

  return (
    <div className="Gameinfo player-row">
      <h2 className='mb-4'>Game Information</h2>
      <Form className="width-40">
        <Row className='mb-2'>
          <Col>
            <Form.Control placeholder="Game Name" value={gameName} onChange={e => setGameName(e.target.value)} />
          </Col>
          <Col>
            <Form.Control type="number" placeholder="Game Score" value={gameScore} onChange={e => setGameScore(e.target.value)} />
          </Col>
        </Row>
        <Row>
          {inputList.map((x, i) => {
            return (
              <div className='d-flex player-row '>
                <Col className='me-2'>
                  <Form.Control name="name"
                    placeholder="Enter Name"
                    value={x.name}
                    key={x + i}
                    onChange={e => handleInputChange(e, i)} />
                </Col>
                <div className="btn-box">
                  {inputList.length !== 1 && <Button

                    className="mr10 me-2"
                    variant="danger"
                    onClick={() => handleRemoveClick(i)}>Remove</Button>}
                  {inputList.length - 1 === i && <Button variant="primary" onClick={e => handleAddClick(e)}>Add</Button>}
                </div>
              </div>
            );
          })}
        </Row>
      </Form>
          {
            bool ?
            <Button variant="warning" type="submit"  onClick={e => handleSubmit(e)}>Start</Button>
            :
            <Button variant="warning" type="submit" disabled onClick={e => handleSubmit(e)}>Start</Button>
          }
      
    </div>
  )
};

export default Gameinfo;
