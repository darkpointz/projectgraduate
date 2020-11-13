import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default class ComponentName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question:"",
      type:"multiplechoice",
      ans1:"",
      ans2:"",
      ans3:"",
      ans4:"",
      ans5:"",
      correct:[],
      chack1:false
    };
    this.handlechoice = this.handlechoice.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handlesubmit = (e) => {
    e.preventDefault();
    const type = this.state.ans1
    const correct = this.state.ans2
    const list = {type,correct}
    console.log('list1 ::' ,type);
    console.log('list2 ::' ,correct);
    // props.savequiz(list)
  };

  handlechoice=(e)=>{
    const {name,value} = e.target
    this.setState({
      [name]:value
    })
  }

  handleChange = (e) =>{
    console.log("Checkbox :: ",e.target.value);

    const newchack=!this.state.chack1
    console.log(newchack);
    this.setState({chack1:newchack})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handlesubmit}>
            <div className="createquiz">
              <label>คำถาม:</label>
              <input
              type="text"
              name="question"
              value={this.state.question}
              onChange={this.handlechoice}
            ></input>
            <br />
            <label>A: </label>
            <Checkbox
              checked={this.state.chack1}
              onChange={this.handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <input
              type="text"
              name="ans1"
              value={this.state.ans1}
              onChange={this.handlechoice}
            ></input>
            <br />
            <label>B:</label>
            {/* <input type="radio" name="correct" value="2"></input> */}
            <input
              type="text"
              name="ans2"
              value={this.state.ans2}
              onChange={this.handlechoice}
            ></input>
            <br />
            <label>C:</label>
            {/* <input type="radio" name="correct" value="3"></input> */}
            <input
              type="text"
              name="ans3"
              value={this.state.ans3}
              onChange={this.handlechoice}
            ></input>
            <br />
            <label>D:</label>
            {/* <input type="radio" name="correct" value="4"></input> */}
            <input
              type="text"
              name="ans4"
              value={this.state.ans4}
              onChange={this.handlechoice}
            ></input>
            <br />
            <label>E:</label>
            {/* <input type="radio" name="correct" value="4"></input> */}
            <input
              type="text"
              name="ans5"
              value={this.state.ans5}
              onChange={this.handlechoice}
            ></input>
            <br />
            {/* {!this.state.btnAddans ? (
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
            )} */}
            <br />
            <button type="submit" value="Submit">
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
    );
  }
}
