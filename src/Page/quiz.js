import React, { Component } from "react";
import Createquiz from "../Components/createquiz";
import Showquiz from "../Components/showquiz";
import firebase from "firebase/app";
import "firebase/firestore";

export default class quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonobj: [],
      btnCreate: false,
    };
    this.clickCreate = this.clickCreate.bind(this);
    this.setjson = this.setjson.bind(this);
    this.btnCreate = this.btnCreate.bind(this);
  }

  setjson(obj) {
    console.log("obj == ", obj);

    //const newlist = jsonobj.list.concat(obj);
    const newlist = { obj };
    console.log("newlist :::: ", newlist);

    // setjsonobj({
    //   list: newlist,
    //   step: stepquiz++,
    //   t:question
    // });key={jsonobj.stepquiz} () => setbtnCreate(true)
    this.setState({
      jsonobj: [...this.state.jsonobj,newlist],
    });
  }
  clickCreate() {
    this.setState({ btnCreate: !this.state.btnCreate });
  }

  clearstate() {
    this.setState({
      jsonobj: [],
    });
  }

  async btnCreate() {
    this.clickCreate();
    await firebase.firestore().collection("quiz").add({
      json: this.state.jsonobj,
    }); 
    await this.clearstate();
  }

  render() {
    return (
      <div>
        <div>
          {!this.state.btnCreate ? (
            <button onClick={this.clickCreate}>createquiz</button>
          ) : (
            <div>
              <Createquiz setjson={this.setjson} submit={this.btnCreate} />
              <hr />
              {this.state.jsonobj.map((jsonobj) => (
                <Showquiz list={jsonobj.obj} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
