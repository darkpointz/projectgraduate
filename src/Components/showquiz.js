import React, { useState } from "react";
import {
  Checkbox,
  Button,
  InputLabel,
  Box
} from '@material-ui/core';
import { display } from '@material-ui/system';
import {
  CheckCircle,
  CheckCircleOutline,
} from '@material-ui/icons';
const Showquiz = ({ list }) => {
  


  const showtf = ()=>{
    {console.log("truefalse")}
    return(
      <div>
          <h2>{list.step}. {list.question}</h2>
          {list.correct==="true" ? <h2>true</h2> 
          : <h2>false</h2>
          }
      </div>
    )
  }
  const showsa = ()=>{
    return(
      <div>
        <h2>{list.step}. {list.question}</h2>
        {list.correct.map((item)=>(
        <div>
          <h2>{item.ans}</h2>
        </div>
        )
        )}
          
      </div>
    )
  }
  const showmc = ()=>{
    return(
      <div>
        <h2>{list.step}. {list.question}</h2>
        {list.choice.map((item)=>(
          <>
            <Box display="flex">
            <Checkbox
              icon={<CheckCircleOutline fontSize="small" />}
              name="correct"
              checked={item.correct}
              checkedIcon={<CheckCircle />}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <h2>{item.ans}</h2>
                {/* <h2>{item.ans}</h2> */}
                </Box>
          </>
          
        )
        )}
          
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
