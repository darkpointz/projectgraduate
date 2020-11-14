import React, { Component } from "react";
import { Label } from "@material-ui/icons";

import Multiplechoice from './multiplechoice'
import Truefalse from './truefalse'
import Shortanswer from './shortanswer'


export default class Createquiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizname: "",
      quiz: [],
      selectchoice: 0
    };
    this.onClicksavequiz = this.onClicksavequiz.bind(this);
    this.onclicksumit = this.onclicksumit.bind(this);
  }

  onclicksumit = (event) => {
    event.preventDefault();
    const quizname = this.state.quizname;
    const quiz = this.state.quiz;

    this.props.submit(quizname, quiz);
    //this.props.setjson(quizname, quiz, event);
    // this.props.submit(question,quiz)
    //this.props.submit  this.onclicksumit
    //-----------
    // const db = firebase.firestore();
    // const userRef = db.collection("quiz").add({
    //   quizname: quizname,
    //   quiz: quiz
    // });
  };

  onClicksavequiz = (newquiz) => {
    this.setState({ quiz: [...this.state.quiz, newquiz] })

    this.setState({ selectchoice: 0 })
  };

  // onChangeTextAnswer = (e) => {
  //   this.setState({ ans: [e.target.value, ...this.state.ans] });
  // };

  onClickSelectchoice = (e) => {
    const value = e.target.value
    this.setState({ selectchoice: value })
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.quizname}
          placeholder="Quiz Title"
          onChange={(e) => this.setState({ quizname: e.target.value })}>
        </input>
        <button onClick={this.onclicksumit}>Save and Exit</button>
        <hr />
        <div>
          {this.state.selectchoice === "1" ? <Multiplechoice savequiz={this.onClicksavequiz} /> :
            this.state.selectchoice === "2" ? <Truefalse savequiz={this.onClicksavequiz} /> :
              this.state.selectchoice === "3" ? <Shortanswer savequiz={this.onClicksavequiz} /> : null}
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

//-----
{/* 
      question: "",
      ans1: "",
      ans2: "",
      ans3: "",
      ans4: "",
      ans5: "",
      ans: [],

       onclicksumit = (event) => {
    event.preventDefault();
    let question = this.state.question;
    let arrayans = [
      this.state.ans1,
      this.state.ans2,
      this.state.ans3,
      this.state.ans4,
      this.state.ans5,
    ];
    let list = { question, arrayans };
    console.log("radio:L ");
    this.props.setjson(list, question);
    this.setState({
      question: "",
      ans1: "",
      ans2: "",
      ans3: "",
      ans4: "",
      ans5: "",
    });
  };

  <form onSubmit={this.onclicksumit}>
          <div className="createquiz">
            <label>คำถาม:</label>
            <input
              type="text"
              value={this.state.question}
              onChange={this.onChangeTextQuestion}
            ></input>
            <br />
            <label>A: </label>
            <input type="radio" name="correct" value="1"></input>
            <input
              type="text"
              name="question"
              value={this.state.ans1} //this.state.ans1
              onChange={(e) => this.setState({ ans1: e.target.value })}
            ></input>
            <br />
            <label>B:</label>
            <input type="radio" name="correct" value="2"></input>
            <input
              type="text"
              value={this.state.ans2}
              onChange={(e) => this.setState({ ans2: e.target.value })}
            ></input>
            <br />
            <label>C:</label>
            <input type="radio" name="correct" value="3"></input>
            <input
              type="text"
              value={this.state.ans3}
              onChange={(e) => this.setState({ ans3: e.target.value })}
            ></input>
            <br />
            <label>D:</label>
            <input type="radio" name="correct" value="4"></input>
            <input
              type="text"
              value={this.state.ans4}
              onChange={(e) => this.setState({ ans4: e.target.value })}
            ></input>
            <br />
            {!this.state.btnAddans ? (
              <button
                onClick={() => {
                  this.setState({ btnAddans: true });
                }}
              >
                เพิ่ม
              </button>
            ) : (
              <div>
                <label>E:</label>
                <input type="radio" name="correct" value="5"></input>
                <input
                  type="text"
                  value={this.state.ans5}
                  onChange={(e) => this.setState({ ans5: e.target.value })}
                ></input>
              </div>
            )}
            <br />
            <button type="submit" value="Submit">
              ยืนยัน
            </button>
          </div>
        </form> */}