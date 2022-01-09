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

    // if (newState !== undefined) {
    this.setState((state) => ({
      history: newState.history ?? state.history,
      display: newState.display ?? state.display,
      isValidFormula: newState.isValidFormula ?? state.isValidFormula,
      isResult: newState.isResult ?? state.isResult,
    }));
    // }
  }

  // calculate(currentState, i /* buttonPressed */) {
  //   let newState = {};
  //   let isValidFormula = true;

  //   switch (i) {
  //     case 0:
  //     case 1:
  //     case 2:
  //     case 3:
  //     case 4:
  //     case 5:
  //     case 6:
  //     case 7:
  //     case 8:
  //     case 9:
  //     case ".":
  //     case "(":
  //     case ")":
  //       try {
  //         eval((currentState.isResult ? "" : currentState.display) + i);
  //       } catch {
  //         //  (e instanceof SyntaxError) do we want to test for SyntaxErrors ?
  //         newState.isValidFormula = false;
  //       }
  //       newState.display =
  //         (currentState.isResult ? "" : currentState.display) + i;
  //       newState.isValidFormula = isValidFormula;
  //       newState.isResult = false;
  //       break;
  //     case "+/-":
  //       if (currentState.display === eval(currentState.display)) {
  //         this.setState((state) => ({
  //           display: -state.display,
  //           isValidFormula: true,
  //         }));
  //       }
  //       break;
  //     case "C":
  //       if (currentState.display.length === 0) {
  //         newState.history = currentState.history.slice(0, 0);
  //       }
  //       newState.display = "CLEAR";
  //       newState.isValidFormula = true;
  //       newState.isResult = false;
  //       break;
  //     case "BS":
  //       try {
  //         eval(currentState.display.slice(0, -1));
  //       } catch {
  //         //  (e instanceof SyntaxError) do we want to test for SyntaxErrors ?
  //         newState.isValidFormula = false;
  //       }
  //       newState.display = currentState.display.slice(0, -1);
  //       newState.isValidFormula = isValidFormula;
  //       newState.isResult = false;
  //       break;
  //     case "/":
  //     case "%":
  //     case "*":
  //     case "-":
  //     case "+":
  //       try {
  //         eval(currentState.display + i);
  //       } catch {
  //         //  (e instanceof SyntaxError) do we want to test for SyntaxErrors ?
  //         newState.isValidFormula = false;
  //       }
  //       newState.display = currentState.display + i;
  //       newState.isValidFormula = isValidFormula;
  //       newState.isResult = false;
  //       break;
  //     case "x²":
  //       try {
  //         eval(currentState.display);
  //         newState.history = currentState.history.concat([
  //           currentState.display +
  //             "^2=" +
  //             eval(currentState.display) * eval(currentState.display),
  //         ]);
  //         newState.display = String(
  //           eval(currentState.display) * eval(currentState.display)
  //         );
  //         newState.isValidFormula = true;
  //         newState.isResult = true;
  //       } catch {
  //         newState.isValidFormula = false;
  //       }
  //       break;
  //     case "√":
  //       try {
  //         eval(currentState.display);
  //         newState.history = currentState.history.concat([
  //           "√" +
  //             currentState.display + "=" +
  //             Math.sqrt(eval(currentState.display)),
  //         ]);
  //         newState.display = String(Math.sqrt(eval(currentState.display)));
  //         newState.isValidFormula = true;
  //         newState.isResult = true;
  //       } catch {
  //         newState.isValidFormula = false;
  //       }
  //       break;
  //     case "=":
  //       try {
  //         eval(currentState.display);
  //         newState.history = currentState.history.concat([
  //           currentState.display + i + eval(currentState.display),
  //         ]);
  //         newState.display = String(eval(currentState.display));
  //         newState.isValidFormula = true;
  //         newState.isResult = true;
  //       } catch {
  //         newState.isValidFormula = false;
  //       }
  //       break;
  //     default:
  //       alert("default error");
  //       break;
  //   }

  //   return newState;
  // }

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
          <div className="message-line">Calculator</div>
          <div className="message-line" style={{ textAlign: "right" }}><button onClick={()=>{alert("Help Wanted")}}>?</button></div>
        </div>
        <div className="calc-history yellow-border">
          <CalcHistory history={this.state.history}> </CalcHistory>
        </div>
        <div className="calc-display-container green-border">
          <CalcDisplay
            inputValue={this.state.display}
            isValidFormula={this.state.isValidFormula}
          ></CalcDisplay>
        </div>
        <div className="calc-message blue-border">
          <div className="message-line">
            {this.state.display.length > 0
              ? this.state.isValidFormula
                ? "VALID FORMULA"
                : "INVALID FORMULA"
              : ""}
          </div>
          <div className="message-line" style={{ textAlign: "right" }}>
            {this.state.isResult ? "RESULT" : ""}
          </div>
        </div>
        <div className="calc-button-panel pink-border"> {buttonLayout} </div>
      </div>
    );
  }
}

function App() {
  return <Calculator></Calculator>;
}

export default App;
