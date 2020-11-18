import React, { useState } from 'react'

export default function Shortanswer(props) {
    const [question, setquestion] = useState('')
    const [correct, setcorrect] = useState([{ ans: "" }])

    const handlesubmit = (e) => {
        e.preventDefault();
        const type = "shortanswer"
        const step = props.step

        const list = { step,question, type, correct }
        
        props.savequiz(list)
    };

    const handlequestion = (e) => {
        setquestion(e.target.value)
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...correct];
        list[index][name] = value;
        setcorrect([...list]);
    };
    const handleRemoveClick = index => {
        const list = [...correct];
        list.splice(index, 1);
        setcorrect([...list]);
    };

    const handleAddClick = () => {
        setcorrect([...correct, { ans: "" }]);
    };
    return (
        <div>
            <div className="shortanswer">
                <label>{`${props.step}. `}</label>
                <input
                    type="text"
                    value={question}
                    placeholder="Have a question to ask?"
                    onChange={handlequestion}
                ></input>
                <br />
                {correct.map((x, i) => {
                    { }
                    return (
                        <div className="box">
                            <input
                                name="ans"
                                placeholder="Correct Answer(Optional)"
                                value={x.ans}
                                onChange={e => handleInputChange(e, i)}
                            />

                            {correct.length !== 1 && <button
                                className="mr10"
                                onClick={() => handleRemoveClick(i)}>X</button>}
                            <div className="btn-box">

                                {(correct.length - 1 === i && correct.length <= 4) ? <button onClick={handleAddClick}>ADD ANSWER</button> :
                                    null
                                }
                            </div>
                            {/* {inputList.length - 1 === i && <button onClick={handleAddClick}>ADD ANSWER</button>}*/}
                        </div>
                    );
                })}
                <button onClick={handlesubmit}>
                    ยืนยัน
                </button>
            </div>

        </div>
    )
}