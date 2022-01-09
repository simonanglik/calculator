import React, { Component } from "react";

class CalcButton extends React.Component {
  render() {
    return (
      <button
        className="calc-button"
        onClick={this.props.onClick}
        key={this.props.faceValue}
      >
        {this.props.faceValue}
      </button>
    );
  }
}

const CalcRow = (props) => {
  var row = [];

  props.buttons.forEach(function (button) {
    row.push(
      <CalcButton
        onClick={() => props.onClick(button)}
        faceValue={button}
        key={button}
      >
      </CalcButton>
    );
  });

  return <div className="calc-panel-row"> {row} </div>;
};

export default CalcRow;
