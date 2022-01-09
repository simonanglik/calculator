import "./App.css";
import React, { Component } from "react";
import CalcHistory from "./CalcHistory.component";
import CalcRow from "./CalcButton.component";
import CalcDisplay from "./CalcDisplay.component";
import { do_calculate } from "./calculatorEngine";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      display: "",
      isValidFormula: true,
      isResult: false,
    };
  }

  buttonClicked(i) {
    console.log("Button clicked now: " + i, " display: ", this.state.display);
    var oldState = this.state;
    var newState = do_calculate(this.state, i);

    console.log(oldState, newState);

    this.setState((state) => ({
      history: newState.history ?? state.history,
      display: newState.display ?? state.display,
      isValidFormula: newState.isValidFormula ?? state.isValidFormula,
      isResult: newState.isResult ?? state.isResult,
    }));
  }

  createRowOfButtons(buttons) {
    return (
      <CalcRow
        onClick={(i) => this.buttonClicked(i)}
        buttons={buttons}
        key={buttons.join("")}
      ></CalcRow>
    );
  }

  render() {
    var buttonLayout = [];
    var calcButtons = [
      ["(", ")", "x²", "C"],
      ["%", "/", "√", "BS"],
      [7, 8, 9, "*"],
      [4, 5, 6, "-"],
      [1, 2, 3, "+"],
      ["+/-", 0, ".", "="],
    ];

    calcButtons.forEach((buttons) => {
      buttonLayout.push(this.createRowOfButtons(buttons));
    });

    return (
      <div className="calculator red-border">
        <div className="calc-message">
          <div className="message-line"> Calculator </div>{" "}
          <div className="message-line" style={{ textAlign: "right" }}>
            {" "}
            <button
              onClick={() => {
                alert("Help Wanted");
              }}
            >
              {" "}
              ?{" "}
            </button>
          </div>
        </div>{" "}
        <div className="calc-history yellow-border">
          <CalcHistory history={this.state.history}> </CalcHistory>{" "}
        </div>{" "}
        <div className="calc-display-container green-border">
          <CalcDisplay
            inputValue={this.state.display}
            isValidFormula={this.state.isValidFormula}
          ></CalcDisplay>{" "}
        </div>{" "}
        <div className="calc-message blue-border">
          <div className="message-line">
            {" "}
            {this.state.display.length > 0
              ? this.state.isValidFormula
                ? "VALID FORMULA"
                : "INVALID FORMULA"
              : ""}{" "}
          </div>{" "}
          <div className="message-line" style={{ textAlign: "right" }}>
            {" "}
            {this.state.isResult ? "RESULT" : ""}{" "}
          </div>{" "}
        </div>{" "}
        <div className="calc-button-panel pink-border"> {buttonLayout} </div>{" "}
      </div>
    );
  }
}

function App() {
  return <Calculator> </Calculator>;
}

export default App;
