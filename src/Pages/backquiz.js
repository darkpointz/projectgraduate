import React, { Component } from "react";
import Createquiz from "../Components/createquiz";
import firebase from "firebase/app";
import "firebase/firestore";

export default class quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnCreate: false,
    };
    this.clickCreate = this.clickCreate.bind(this);
    this.btnCreate = this.btnCreate.bind(this);
  }

  clickCreate() {
    this.setState({ btnCreate: !this.state.btnCreate });
  }

  clearstate() {
    this.setState({
      quizname: "",
      quiz: [],
    });
  }

  async btnCreate(quizname, quiz) {
    this.clickCreate();
    await firebase.firestore().collection("quiz").add({
      quizname: quizname,
      quiz: quiz,
    });
    await this.clearstate();
  }

  render() {
    return (
      <div>
        {!this.state.btnCreate ? (
          <button onClick={this.clickCreate}>createquiz</button>
        ) : (
          <div>
            <Createquiz submit={this.btnCreate} />
            <hr />
          </div>
        )}
      </div>
    );
  }
}
