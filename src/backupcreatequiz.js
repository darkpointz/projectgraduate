import React, { Component ,useState } from "react";
import "./quiz.css";
const Createquiz = (props) => {
  const [ans, setans] = useState({
    ans: {},
  });

  
  
  const onclicksumit = (event) => {
    event.preventDefault();
    let name = `step${props.step}`;
    let question = document.getElementById("question").value;
    let ans1 = document.getElementById("ans1").value;
    let ans2 = document.getElementById("ans2").value;
    let ans3 = document.getElementById("ans3").value;
    let ans4 = document.getElementById("ans4").value;
    let arrayans = [ans1, ans2, ans3, ans4];
    let list = { question, arrayans };
    // console.log('lit  ',props.step,list);
    props.setjson(props.step, list);
  };


  return (
    <form onSubmit={onclicksumit}>
      <div className="Content">
        คำถาม:<input type="text" id="question"></input>
        <br />
        1:<input type="text" id="ans1"></input>
        <br />
        2:<input type="text" id="ans2"></input>
        <br />
        3:<input type="text" id="ans3"></input>
        <br />
        4:<input type="text" id="ans4"></input>
        <br />
        <button type="submit">ยืนยัน</button>
      </div>
    </form>
    //   <form onSubmit={onclicksumit}>
    //     <div className="Content">
    //       คำถาม:<input type="text" onChange={(event)=>list.question=event.target.value}></input>
    //       <br/>
    //       1:<input type="text" onChange={(event)=>list.answers1.push=event.target.value}></input>
    //       <br/>
    //       2:<input type="text" onChange={(event)=>list.answers2.push=event.target.value}></input>
    //       <br/>
    //       3:<input type="text" onChange={(event)=>list.answers3.push=event.target.value}></input>
    //       <br/>
    //       4:<input type="text" onChange={(event)=>list.answers4.push=event.target.value}></input>
    //       <br/>
    //       <button type="submit" >ยืนยัน</button>
    //     </div>
    // </form>
  );
};
export default Createquiz;
////ดเ้ดเ้ดเ้ดเ้ดเ้
import React, { useState } from "react";
import "../quiz.css";
const Createquiz = (props) => {
  const [quiz, setquiz] = useState({
    question: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
  });

  const onclicksumit = (event) => {
    event.preventDefault();
    // let question = quiz.question
    // let arrayans = [quiz.ans1,quiz.ans2,quiz.ans3,quiz.ans4]
    // let list = {question,arrayans };
    console.log("question :: ", quiz.question);
    console.log("ans1 :: ", quiz.ans1);
    // console.log(list);
    //props.setjson(props.step, list);
  };
  let onChangeTextQuestion = (e) => {
    setquiz({ question: e.target.value });
  };

  let onChangeTextAnswer = (e) => {
    setquiz({ ans1: e.target.value });
  };

  return (
    <form onSubmit={onclicksumit}>
      <div className="Content">
        คำถาม:
        <input
          type="text"
          id="ans1"
          value={undefined}
          onChange={onChangeTextQuestion}
        ></input>
        <br />
        1:
        <input
          type="text"
          id="ans"
          value={undefined}
          onChange={onChangeTextAnswer}
        ></input>
        <br />
        {/* 2:<input type="text" value={undefined} onChange={e=>setquiz({ans2:e.target.value})}></input>
        <br />
        3:<input type="text" value={undefined} onChange={e=>setquiz({ans3:e.target.value})}></input>
        <br />
        4:<input type="text" value={undefined} onChange={e=>setquiz({ans4:e.target.value})}></input> */}
        <br />
        <button type="submit" value="Submit">
          ยืนยัน
        </button>
      </div>
    </form>
    //   <form onSubmit={onclicksumit}>
    //     <div className="Content">
    //       คำถาม:<input type="text" onChange={(event)=>list.question=event.target.value}></input>
    //       <br/>
    //       1:<input type="text" onChange={(event)=>list.answers1.push=event.target.value}></input>
    //       <br/>
    //       2:<input type="text" onChange={(event)=>list.answers2.push=event.target.value}></input>
    //       <br/>
    //       3:<input type="text" onChange={(event)=>list.answers3.push=event.target.value}></input>
    //       <br/>
    //       4:<input type="text" onChange={(event)=>list.answers4.push=event.target.value}></input>
    //       <br/>
    //       <button type="submit" >ยืนยัน</button>
    //     </div>
    // </form>
  );
};
export default Createquiz;

