import React, { useState } from "react";
const Showquiz = ({list }) => {
  return (
    <div>
      {/* <div>{jsonobj.question}</div> */}
      <h1>{list.step}</h1>
      <h2>{list.question}</h2>
      {list.arrayans.map((list) => (<h3>{list}</h3>))}
      <hr />
    </div>
  );
};
export default Showquiz;
