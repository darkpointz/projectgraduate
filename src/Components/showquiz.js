import React, { useState } from "react";
const Showquiz = ({ list }) => {
  
  const showtf = ()=>{
    {console.log("truefalse")}
    return(
      <div>
          <h2>{list.step}. {list.question}</h2>
          <h2>truefalse</h2>
      </div>
    )
  }
  const showsa = ()=>{
    return(
      <div>
        <h2>{list.step}. {list.question}</h2>
        <h2>shortanswer</h2>
          
      </div>
    )
  }
  const showmc = ()=>{
    return(
      <div>
        <h2>{list.step}. {list.question}</h2>
        <h2>multiplechoice</h2>
          
      </div>
    )
  }



  return (
    <div>
      <div>
        {console.log(list)}
        {/* <h2>{list.step}. {list.question}</h2> */}
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
