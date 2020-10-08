import React, { useState } from "react";
import Createquiz from "../Components/createquiz";
import Showquiz from "../Components/showquiz";

export default function Quiz() {
  let [jsonobj, setjsonobj] = useState({
    list: [],
    step: 1,
    t:""
  });
  const [btnCreate, setbtnCreate] = useState(false);
  const setjson = (stepquiz, obj,question) => {
    console.log("stepquiz == ", stepquiz);
    console.log("obj == ", obj);

    const newlist = jsonobj.list.concat(obj);

    console.log('newlist :::: ',newlist);

    setjsonobj({
      list: newlist,
      step: 2,
      t:question
    });

    //setjsonobj({
    //step:stepquiz,
    //a:jsonobj.step++,
    //list:[...jsonobj.list,newlist],
    //step:jsonobj.step++
    //})

    console.log("--set---");
    console.log(jsonobj.list);
    console.log(jsonobj.t);
  };
  return (
    <div>
      <div>
        <button onClick={() => setbtnCreate(true)}>createquiz</button>
        {btnCreate && <Createquiz step={jsonobj.step} setjson={setjson} />}
        <h1>-- : {jsonobj.t}</h1>

        
        {/* <Createquiz step={this.state.step} setjson={this.state.setjson}/> */}
        {/* <Showquiz list={jsonobj.list}></Showquiz> */}
        {/* <h1>-- : {this.state.list | JSON}</h1> */}
        <hr></hr>
      </div>
    </div>
  );
}
