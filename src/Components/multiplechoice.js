import React, { Component, useState, Fragment } from 'react';
import {
  Button,
  Checkbox,
  TextField,
  makeStyles

} from '@material-ui/core';
import { brown } from '@material-ui/core/colors';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(3),
//       width: 400,
//     },
//   },
// }));



// const Multiplechoice = () => {
//   const [inputFields, setInputFields] = useState([
//     { firstName: '', lastName: '' }
//   ]);

//   const classes = useStyles();
//   const handleSubmit = e => {
//     e.preventDefault();
//     console.log("inputFields", inputFields);
//   };

//   return (
//     <div>
//       <h1>Multiplechoice Form</h1>
//       <form className={classes.root} onSubmit={handleSubmit}>

//         <div>
//           <TextField
//             label="คำถาม"
//             id="outlined-size-normal"
//             variant="outlined"
//             placeholder="คำถาม"
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </div>

//         <div>
//           {inputFields.map((inputField, index) => (

//             <Fragment key={`${inputField}~${index}`}>
//               <div className="form-group col-sm-6">
//                 <label htmlFor="firstName">First Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="firstName"
//                   name="firstName"
//                   value={inputField.firstName}
//                 />
//               </div>


//             </Fragment>
//           ))}
//         </div>
//       </form>
//     </div>
//   )
// }

//


export class Multiplechoice extends Component {

  constructor(props) {
    super(props);

    this.state = {
      question: "",
      type: "multiplechoice",
      arrAnsList: [5],
      arrAnsChoice: [],
      chack1: false,
      chack2: false,
      chack3: false,
      chack4: false,
      chack5: false,
    };

    this.handlechoice = this.handlechoice.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);



  }


  handlesubmit = (e) => {
    e.preventDefault();
    let choice = []
    for (let i = 1; i <= 5; i++) {
      let x = this.state.ans1
      console.log(this.state.ans1, this.state.ans2);
      // choice[i] = this.state.ans + `${i}`
    }
    const correct = this.state.ans2
    const list = { correct }
    console.log('list1 ::', choice);
    console.log('list2 ::', correct);
    // props.savequiz(list)
  };

  handlechoice = (i, e) => {
    this.setState({
      arrAnsChoice: { ...this.state.arrAnsChoice, [i]: e.target.value }
    })
  }

  handleCheckbox = (e) => {
    const { name, value } = e.target
    const newchack = !value
    this.setState({ [name]: newchack })
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
            //onChange={this.handlechoice}
            ></input>
            <br />

            {this.createAnswer()}

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



  createAnswer = () => {
    let answerList = [];
    let aa = this.state.arrAnsList[0] + 1;
    for (let i = 0; i < aa; i++) {
      answerList.push(
        <div>
          <TextField
            id={`ans-${i}`}
            label={`คำตอบที่ ${i + 1}`}
            value={this.state.arrAnsChoice[i]}
            onChange={(this.handlechoice.bind(this, i))}
            variant="outlined"
          />
          {i > 1 ? <Button>X</Button> : ''}

        </div>
      )
    }
    return answerList
  }
}

export default Multiplechoice;


