import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  TextField,

} from '@material-ui/core';
import {
  ClearIconm,
  CheckCircle,
  CheckCircleOutline,
} from '@material-ui/icons';

export default function Multiplechoice(props) {
  const [arrAnsChoice, setarrAnsChoice] = useState(
    [{ ans: "", correct: false },
     { ans: "", correct: false }, 
     { ans: "", correct: false }, 
     { ans: "", correct: false },
     { ans: "", correct: false }]
  )
  const [question, setquestion] = useState('')

  const handlechoice = (e, index) => {
    const { name, value } = e.target;
    const list = [...arrAnsChoice];
    list[index][name] = value
    setarrAnsChoice(list)
  }

  const handlesubmit = (e) => {
    e.preventDefault();

    const choice = arrAnsChoice
    const type = "multiplechoice"
    const step = props.step
    const list = { step,question, type, choice }
    props.savequiz(list)
  };

  const handleDeletefield = (index) => {
    const list = [...arrAnsChoice]
    list.splice(index, 1)
    setarrAnsChoice(list)
  }

  const handleAddClick = () => {
    setarrAnsChoice([...arrAnsChoice, { ans: "" }]);
  };

  const handleQuestion = (e) => {
    setquestion(e.target.value)
  }

  const handleCheckbox = (e, index) => {
    const { name, checked } = e.target
    const list = [...arrAnsChoice];

    list[index][name] = checked
    setarrAnsChoice(list)
  }

  return (
    <div>
      <div>
        <div className="createquiz">
          <label>{`${props.step}. `}</label>
          <input
            type="text"
            name="question"
            value={question}
            onChange={handleQuestion}
          ></input>
          <br />
          {arrAnsChoice.map((x, i) => {
            return (
              <div className="box">
                <Checkbox
                  icon={<CheckCircleOutline fontSize="small" />}
                  name="correct"
                  style ={{
                    color: "#00FF08",
                  }}
                  checkedIcon={<CheckCircle />}
                  onChange={e => handleCheckbox(e, i)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <input
                  name="ans"
                  placeholder={`Answer ${i + 1}`}
                  value={x.ans}
                  onChange={e => handlechoice(e, i)}
                />

                {arrAnsChoice.length !== 2 && <button
                  className="mr10"
                  onClick={() => handleDeletefield(i)}>X</button>}
                <div className="btn-box">
                  {(arrAnsChoice.length - 1 === i && arrAnsChoice.length <= 4) ? <button onClick={handleAddClick}>ADD ANSWER</button> :
                    null
                  }
                </div>
              </div>
            );
          })}
          <br />
          <button onClick={handlesubmit}>
            ยืนยัน
            </button>
        </div>
      </div>
    </div>
  )
}
