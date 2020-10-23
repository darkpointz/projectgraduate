import React, { Component } from "react";
import { Label } from "@material-ui/icons";
import Addanswer from "./addanswer";

export default class Createquiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      ans1: "",
      ans2: "",
      ans3: "",
      ans4: "",
      ans5: "",
      ans:[],
      btnAddans: false,
    };
  }

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

  onChangeTextQuestion = (e) => {
    this.setState({ question: e.target.value });
  };

  onChangeTextAnswer = (e) => {
    this.setState({ ans: [e.target.value, ...this.state.ans] });
  };

  checkaddanswer = () => {};

  render() {
    return (
      <div>
        <form onSubmit={this.onclicksumit}>
          <div className="createquiz">
            <label>คำถาม:</label>
            <input
              type="text"
              value={this.state.question}
              onChange={this.onChangeTextQuestion}
            ></input>
            <br />
            <label>A:</label>
            <input
              type="text"
              name="question"
              value={this.state.ans1}//this.state.ans1
              onChange={(e) => this.setState({ ans1: e.target.value })}
            ></input>
            <br />
            <label>B:</label>
            <input
              type="text"
              value={this.state.ans2}
              onChange={(e) => this.setState({ ans2: e.target.value })}
            ></input>
            <br />
            <label>C:</label>
            <input
              type="text"
              value={this.state.ans3}
              onChange={(e) => this.setState({ ans3: e.target.value })}
            ></input>
            <br />
            <label>D:</label>
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
        </form>
        <hr />
        <button onClick={this.props.submit}>สร้าง</button>
      </div>
    );
  }
}
