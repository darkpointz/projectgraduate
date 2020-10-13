import React, { Component } from "react";
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

export default class addanswer extends Component {
  render() {
    return (
      <div>
        <label>เพิ่มคำถาม</label>
        <AddCircleOutlineRoundedIcon
          style={{ fontSize: 30 }}
          color="primary"
          onClick={this.AddAnswer}
        ></AddCircleOutlineRoundedIcon>
      </div>
    );
  }
}
