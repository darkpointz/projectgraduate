import React, { Component } from "react";

export default class Createquiz extends Component {
  state = {
    question: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
  };

  onclicksumit = (event) => {
    event.preventDefault();
    let question = this.state.question;
    let arrayans = [
      this.state.ans1,
      this.state.ans2,
      this.state.ans3,
      this.state.ans4,
    ];
    let list = { question, arrayans };
    // console.log("question :: ", this.state.question);
    // console.log("ans1 :: ", this.state.ans1);
    console.log(list);
    this.props.setjson(this.props.step, list, question);
    this.setState({
      question: "",
      ans1: "",
      ans2: "",
      ans3: "",
      ans4: "",
    });
  };

  onChangeTextQuestion = (e) => {
    this.setState({ question: e.target.value });
  };

  onChangeTextAnswer = (e) => {
    this.setState({ ans1: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onclicksumit}>
        <div className="Content">
          คำถาม:
          <input
            type="text"
            id="ans1"
            value={this.state.question}
            onChange={this.onChangeTextQuestion}
          ></input>
          <br />
          1:
          <input
            type="text"
            name="question"
            value={this.state.ans1}
            onChange={this.onChangeTextAnswer}
          ></input>
          <br />
          2:
          <input
            type="text"
            value={this.state.ans2}
            onChange={(e) => this.setState({ ans2: e.target.value })}
          ></input>
          <br />
          3:
          <input
            type="text"
            value={this.state.ans3}
            onChange={(e) => this.setState({ ans3: e.target.value })}
          ></input>
          <br />
          4:
          <input
            type="text"
            value={this.state.ans4}
            onChange={(e) => this.setState({ ans4: e.target.value })}
          ></input>
          <br />
          <button type="submit" value="Submit">
            ยืนยัน
          </button>
        </div>
      </form>
    );
  }
}
