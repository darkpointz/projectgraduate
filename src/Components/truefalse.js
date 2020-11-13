import { green } from '@material-ui/core/colors';
import React ,{useState}from 'react'

const Truefalse =(props) =>{
    const [quiz, setquiz] = useState({
        type:"truefalse",
        correct:"",
        bgColor:'blue'

    })
    const [question, setquestion] = useState('')
    const [bgColor, setbgColor] = useState({  //จะแสดงเปลี่ยนสีtruefalse
        color:""
    })

    const handlesubmit = (e) => {
        e.preventDefault();
        const type = quiz.type
        const correct = quiz.correct
        const list = {question,type,correct}
        console.log('list ::' ,list);
        props.savequiz(list)
    };
    const changecorrect = (e)=>{
        const value=e.target.value;
        setquiz({correct:value})
        console.log(value);
        // if(value==="true"){
        //     setbgColor({color:"green"})
        // }else if(value==="false"){
        //     setbgColor({color:"red"})
        // }
    }

    const handlequestion = (e) =>{
        setquestion(e.target.value)
    }

    return (
        <div>
            <form onSubmit={handlesubmit}>
            <div className="truefalse">
            
                <label>คำถาม:
                    <input
                    type="text"
                    value ={question}
                    placeholder="Have a question to ask?"
                    onChange={handlequestion}
                    ></input>
                </label>
                <br/>
                <button type="button" value="true"  onClick={changecorrect}>True</button>
                <button type="button" value="false" onClick={changecorrect}>False</button>
                <br/>
                <button type="submit" value="Submit">
                ยืนยัน
                </button>
                </div>
              </form>
            
            <br />
        </div>//this.setState({ question: e.target.value } style={{backgroundColor:bgColor.color}}  onClick={onsubmit}
    )
}
export default Truefalse;