import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Quiz from "./Page/quiz";
import Navbar from "./Components/navbar";
import initialFirebase from "./Components/initialFirebase"

export default function App() {
  initialFirebase()
  return (
    //<Navbar></Navbar>
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <NavLink to="/quiz">QuizForm</NavLink>
          </li>
        </ul>
        <Route path="/quiz" component={Quiz}></Route>
      </div>
    </BrowserRouter>
  );
}
