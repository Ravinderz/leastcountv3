import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './ScoreboardRow.css';

function ScoreboardRow(props) {

  let players = props.players;
  let gameScore = props.gameScore;
  let total = props.total;
  let arr = [];
  let [rowScore, setRowScore] = useState([]);
  let [disableBtn, setDisableBtn] = useState(false);
  let [pressedKey, setPressedKey] = useState('');

  useEffect(() => {
    initializeRowScore();
  }, []);

  const initializeRowScore = () => {
    players.forEach(element => {
      arr.push(0);
    });
    setRowScore(arr);
  }

  const updateScoreRow = (e, i) => {

    var key = e.key || e.charCode;
    console.log(e);
    console.log(key);

    if(key === 'Backspace' || key === 'Delete' || pressedKey === 'Backspace'){
      setPressedKey(key);
      let arr = [...rowScore];
      arr[i] = '';
      setRowScore(arr);
      return;
    }

    // if(key === 8 || key === )

    let val = e.target.value;

    if (!val.match(/^([0-9]+)$/)) {
      if (val !== 'x') {
        props.updateShow();
        setDisableBtn(true);
        return;
      }
    }

    let arr = [...rowScore];
    if (val && (val === 'x')) {
      val = 'XX';
    }

    if (val !== 'XX' && (val > 40 || val < 0)) {
      props.updateShow();
      setDisableBtn(true);
      return;
    } else {
      arr[i] = val;
      setDisableBtn(false);
      props.dismissShow();
    }
    setRowScore(arr);

    console.log(total);
  }

  const handleClick = (e) => {
    e.preventDefault();
    props.updateScore(rowScore);
    initializeRowScore();
  }

  return (
    <>
      <tr>
        {
          players.map((val, index) => (
            <td xs="auto" key={val + index}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  {(total && (total[index] === gameScore || total[index] > gameScore)) ?
                    <Form.Control type="text" disabled value={rowScore[index]} placeholder="value" onChange={e => updateScoreRow(e, index)} />
                    : <Form.Control type="text" value={rowScore[index]} placeholder="enter value" onChange={e => updateScoreRow(e, index)}  onKeyDown={e => updateScoreRow(e,index)}/>
                  }
                </Form.Group>
              </Form>
            </td>
          ))
        }
      </tr>
      <tr className='no-style'>
        <td className='no-style' colSpan={players.length}>
          {disableBtn ? <Button variant="primary" disabled type="submit" className='mt-3 me-3 width-100' onClick={e => handleClick(e)}>
            Add
          </Button> :
            <Button variant="primary" type="submit" className='mt-3 me-3 width-100' onClick={e => handleClick(e)}>
              Add
            </Button>}
        </td>
      </tr>

      {/* <Button variant="primary" type="submit">
        Submit
      </Button> */}
    </>
  );
}

export default ScoreboardRow;
