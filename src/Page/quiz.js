import React, { useState } from "react";
import Createquiz from "../Components/createquiz";
import Showquiz from "../Components/showquiz";

let step = 1;
export default function Quiz() {
  // let [jsonobj, setjsonobj] = useState({
  //   list: [],
  //   step: 1,
  //   t:""
  // });
  const [jsonobj, setjsonobj] = useState([]);
  const [btnCreate, setbtnCreate] = useState(false);
  const setjson = (stepquiz, obj, question) => {
    console.log("stepquiz == ", stepquiz);
    console.log("obj == ", obj);

    //const newlist = jsonobj.list.concat(obj);
    const newlist = { stepquiz, obj };
    console.log("newlist :::: ", newlist);

    // setjsonobj({
    //   list: newlist,
    //   step: stepquiz++,
    //   t:question
    // });key={jsonobj.stepquiz} () => setbtnCreate(true)
    setjsonobj([newlist, ...jsonobj]);
    step += 1;
  };

  const clickCreate = () => {
    setbtnCreate(!btnCreate);
  };
  return (
    <div>
      <div>
        {!btnCreate && <button onClick={clickCreate}>createquiz</button>}
        {btnCreate && (
          <div>
            <Createquiz step={step} setjson={setjson} submit={clickCreate} />
            <hr />
            {jsonobj.map((jsonobj) => (
              <Showquiz list={jsonobj.obj}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
