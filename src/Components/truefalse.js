import { green } from '@material-ui/core/colors';
import React, { useState } from 'react'

const Truefalse = (props) => {
    const [quiz, setquiz] = useState({
        correct: "",

    })
    const [question, setquestion] = useState('')

    const handlesubmit = (e) => {
        e.preventDefault();
        const type = "truefalse"
        const correct = quiz.correct
        const step = props.step
        const list = { step,question, type, correct }
        props.savequiz(list)
    };
    const changecorrect = (e) => {
        const value = e.target.value;
        setquiz({ correct: value })
        if (value === "true") {
            document.getElementById("btnt").style.backgroundColor = "#00FF08";
            document.getElementById("btnf").style.backgroundColor = "";
        } else if (value === "false") {
            document.getElementById("btnt").style.backgroundColor = "";
            document.getElementById("btnf").style.backgroundColor = "#E93939";
        }
    }

    const handlequestion = (e) => {
        setquestion(e.target.value)
    }

    return (
        <div>
            <div className="truefalse">
                    <label>{`${props.step}. `}</label>
                    <input
                        type="text"
                        value={question}
                        placeholder="Have a question to ask?"
                        onChange={handlequestion}
                    ></input>
                    <br />
                    <button id="btnt" type="button" value="true" onClick={changecorrect}>True</button>
                    <button id="btnf" type="button" value="false" onClick={changecorrect}>False</button>
                    <br />
                    <button onClick={handlesubmit}>
                        ยืนยัน
                    </button>
                </div>
            <br />
        </div>//this.setState({ question: e.target.value } style={{backgroundColor:bgColor.color}}  onClick={onsubmit}
    )
}
export default Truefalse;