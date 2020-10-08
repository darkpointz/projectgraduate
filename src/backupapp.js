import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Createquiz from "./Components/createquiz";
import Showquiz from "./showquiz";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnCreate: false,
      list: [],
      step: 1,
    };

    this.setbtnCreate = this.setbtnCreate.bind(this);
  }

  setbtnCreate = () => {
    this.setState({
      btnCreate: true,
    });
  };

  setjson = (stepquiz, obj) => {
    console.log("stepquiz == ", stepquiz);
    console.log("obj == ", obj);

    // this.setState({
    //   list: "ff",
    // });
    const newlist = this.state.list.concat(obj);

    //console.log('newlist :::: ',newlist);
    this.setState({
      // list: obj.question,
      list: newlist,
      step: 2,
    });

    console.log("--set---");
    console.log("list L:: ", this.state.list);
    console.log("obj.question == ", obj.question);
    // console.log("step L:: ", this.state.step);
  };

  render() {
    return (
      <div>
        <button onClick={this.setbtnCreate}>createquiz</button>
        {console.log(this.state.btnCreate)}
        {this.state.btnCreate && (
          <Createquiz
            step={this.state.step}
            setjson={this.setjson.bind(this)}
          />
        )}
        {/* <h1>-- : {this.state.list}</h1> */}
        {/* <Createquiz step={this.state.step} setjson={this.state.setjson}/> */}
        {/* <Showquiz list={this.state.list}></Showquiz> */}
        <h1>-- : {this.state.list | JSON}</h1>
        <hr></hr>
      </div>
    );
  }
}
export default App;
