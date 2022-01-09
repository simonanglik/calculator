import React, { Component } from "react";

class CalcDisplay extends Component {
  render() {
    var formulaClass = this.props.isValidFormula
      ? "good-formula"
      : "bad-formula";

    return (
      <input
        className={["calc-display", formulaClass].join(" ")}
        readOnly
        value={this.props.inputValue}
      ></input>
    );
  }
}

export default CalcDisplay;
