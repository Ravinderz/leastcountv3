import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './ScoreboardRow.css';

function ScoreboardRow(props) {

  let players = props.players;
  let arr = [];
  let [rowScore, setRowScore] = useState([]);

  useEffect(() => {
    initializeRowScore();
  }, []);

  const initializeRowScore = () => {
    players.forEach(element => {
      arr.push(0);
    });
    setRowScore(arr);
  }

  const updateScoreRow = (val, i) => {
    let arr = [...rowScore];
    arr[i] = val;
    setRowScore(arr);
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log(rowScore);
    props.updateScore(rowScore);
    initializeRowScore();
  }

  return (
    <>
      <tr>
        {
          players.map((val, index) => (
            <td xs="auto" key={val}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" value={rowScore[index]} placeholder="0" onChange={e => updateScoreRow(e.target.value, index)} />
                </Form.Group>
              </Form>
            </td>
          ))
        }
      </tr>
      <Button variant="primary" type="submit" onClick={e => handleClick(e)}>
        Add
      </Button>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </>
  );
}

export default ScoreboardRow;
