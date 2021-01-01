import React, { Component } from "react";
import { Label } from "@material-ui/icons";
import {makeStyles ,TextField} from '@material-ui/core';

import Multiplechoice from './multiplechoice'
import Truefalse from './truefalse'
import Shortanswer from './shortanswer'
import Showquiz from './showquiz'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default class Createquiz extends Component {

  constructor(props) {
    super(props);

    this.state = {
      quizname: "",
      quiz: [],
      selectchoice: 0,
      step:1
    };
    this.onClicksavequiz = this.onClicksavequiz.bind(this);
    this.onclicksumit = this.onclicksumit.bind(this);
  }

  onclicksumit = (event) => {
    event.preventDefault();
    const quizname = this.state.quizname;
    const quiz = this.state.quiz;

    this.props.submit(quizname, quiz);
  };

  onClicksavequiz = (newquiz) => {
    this.setState({ quiz: [...this.state.quiz, newquiz] })

    this.state.step++
    this.setState({ selectchoice: 0 })
  };


  onClickSelectchoice = (e) => {
    const value = e.target.value
    this.setState({ selectchoice: value })
  }
  render() {
    return (
      <div>
        <TextField 
          label="Required"
          value={this.state.quizname}
          placeholder="Quiz Title"
          variant="outlined"
          size="small"
          onChange={(e) => this.setState({ quizname: e.target.value })}>
        </TextField>
        <button onClick={this.onclicksumit}>Save and Exit</button>
        <hr />
        <div>
        {this.state.quiz.map((quiz) => (
          <Showquiz list={quiz} />
        ))}


          {this.state.selectchoice === "1" ? <Multiplechoice step={this.state.step} setstep={this.onSetstep} savequiz={this.onClicksavequiz} /> :
           this.state.selectchoice === "2" ? <Truefalse step={this.state.step} setstep={this.onSetstep} savequiz={this.onClicksavequiz} /> :
           this.state.selectchoice === "3" ? <Shortanswer step={this.state.step} setstep={this.onSetstep} savequiz={this.onClicksavequiz} /> : null}
        </div>
        <label>Add a question</label>
        <br />
        <button value="1" onClick={this.onClickSelectchoice}>Multiplechoice</button>
        <button value="2" onClick={this.onClickSelectchoice}>Truefalse</button>
        <button value="3" onClick={this.onClickSelectchoice}>ShortAnswer</button>

      </div>
    );
  }
}
