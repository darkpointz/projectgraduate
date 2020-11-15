import React, { useState } from "react";
const Showquiz = ({ list }) => {
  
  const showtf = ()=>{
    {console.log("truefalse")}
    return(
      <div>
        
          <h1>truefalse</h1>
      </div>
    )
  }
  const showsa = ()=>{
    return(
      <div>
          shortanswer
      </div>
    )
  }
  const showmc = ()=>{
    return(
      <div>
          multiplechoice
      </div>
    )
  }



  return (
    <div>
      <div>
        {console.log(list)}
        <h2>{list.step}. {list.question}</h2>
        {list.type=== "truefalse" ? showtf() :
         list.type=== "shortanswer" ? showsa() :
         list.type=== "multiplechoice" ? showmc() : null
        }
        {/* <h1>{list.step}</h1>
        <h2>{list.question}</h2>
        {list.arrayans.map((list) => (
          <h3>{list}</h3>
        ))} */}
      </div>
      <hr />
    </div>
  );
};
export default Showquiz;
