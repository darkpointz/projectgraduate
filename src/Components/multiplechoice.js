import React from 'react'

export default function multiplechoice() {
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
        </form>
        </div>
    )
}
