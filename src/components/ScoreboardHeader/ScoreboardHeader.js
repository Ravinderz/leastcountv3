import React from 'react';
import './ScoreboardHeader.css';

function ScoreboardHeader(props) {

  let players = props.players

  return (
    <tr>
      {
        players.map((val, index) => (
          <td key={val + index} className='text-center'>{val.name}</td>
        ))
      }
    </tr>
  );
}

export default ScoreboardHeader;
