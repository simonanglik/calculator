import './App.css';
import React, { Component } from 'react';

// See https://medium.com/@shuseel/how-to-create-a-simple-calculator-using-html-and-javascript-50a83cb2b90e

class MyButton extends React.Component {

  render() {
    return (
      <button className='calc-button' onClick={this.props.onClick} key={this.props.index}>
        {this.props.faceValue}
      </button>
    )
  }
}

class MyHistory extends React.Component {
  render() {
    var historyWindow = [];

    this.props.history.forEach(function (line, index) {
      historyWindow.push(<li style={{backgroundColor: 'pink'}}>{line}</li>);
    })

    return (
      <ul style={{backgroundColor: 'green'}}>{historyWindow}</ul>
    )
  }
}

class MyDisplay extends React.Component {
  render() {
    return (
      <input className='calc-display' readOnly style={{ border: (this.props.isValidFormula) ? 'solid 4px black' : 'solid 4px red' }} value={this.props.inputValue}></input>
    )
  }
}

const MyRow = (props) => {
  var row = [];

  let rowOffset = props.rowId * props.buttons.length;

  props.buttons.forEach(function (button, index) {
    // console.log('index + rowOffset: ', index + rowOffset);
    row.push(<MyButton textcolor={props.textcolor} onClick={() => props.onClick(button)} faceValue={button} key={index} index={index + rowOffset}></MyButton>);
  })

  return (
    <div className='calc-panel-row'>{row}</div>
  )
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      display: '',
      isValidFormula: true
    }
  }

  buttonClicked(i) {
    console.log('Button clicked: ' + i, ' display: ', this.state.display);
    let isValidFormula = true;
    switch (i) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case '.':
      case '(':
      case ')':
        try {
          eval(this.state.display + i);
        } catch { //  (e instanceof SyntaxError) do we want to test for SyntaxErrors ?
          isValidFormula = false;
        }
        this.setState(state => ({
          display: state.display + i,
          isValidFormula: isValidFormula
        }));
        break;
      case '+/-':
        if (this.state.display === eval(this.state.display)) {
          this.setState(state => ({
            display: -state.display,
            isValidFormula: true
          }));
        }
        break;
      case 'C':
        this.setState({
          display: '',
          isValidFormula: true
        });
        break;
      case 'BS':
        try {
          eval(this.state.display.slice(0, -1));
        } catch { //  (e instanceof SyntaxError) do we want to test for SyntaxErrors ?
          isValidFormula = false;
        }
        this.setState(state => ({
          display: state.display.slice(0, -1),
          isValidFormula: isValidFormula
        }));
        break;
      case '/':
      case '%':
      case '*':
      case '-':
      case '+':
        try {
          eval(this.state.display + i);
        } catch { //  (e instanceof SyntaxError) do we want to test for SyntaxErrors ?
          isValidFormula = false;
        }
        this.setState(state => ({
          display: state.display + i,
          isValidFormula: isValidFormula
        }));
        break;
      case 'x²':
        try {
          eval(this.state.display);
          this.setState(state => ({
            history: state.history.concat([state.display + '^2=' + eval(state.display) * eval(state.display)]),
            display: eval(state.display) * eval(state.display),
            isValidFormula: true
          }));
        } catch {
          alert('Error');
          this.setState({ isValidFormula: false });
        }
        break;
      case '√':
        try {
          eval(this.state.display);
          this.setState(state => ({
            display: Math.sqrt(eval(state.display)),
            isValidFormula: true
          }));
        } catch {
          alert('Error');
          this.setState({ isValidFormula: false });
        }
        break;
      case '=':
        try {
          console.log("Trying to evaluate: ", this.state.display);
          eval(this.state.display);
          this.setState(state => ({
            history: state.history.concat([state.display + i + eval(state.display)]),
            display: eval(state.display),
            isValidFormula: true
          }));
        } catch {
          alert('Error');
          this.setState({ isValidFormula: false });
        }
        break;
      default:
        alert('default error');
        break;
    }
  }

  createRowOfButtons(buttons, index) {
    return <MyRow textcolor='red' onClick={(i) => this.buttonClicked(i)} buttons={buttons} rowId={index}></MyRow>;
  }

  render() {
    var buttonLayout = [];
    var calcButtons = [
      ['(', ')', 'x²', 'C'],
      ['%', '/', '√', 'BS'],
      [7, 8, 9, '*'],
      [4, 5, 6, '-'],
      [1, 2, 3, '+'],
      ['+/-', 0, '.', '=']
    ];

    calcButtons.forEach((buttons, index) => {
      buttonLayout.push(this.createRowOfButtons(buttons, index));
    });

    return (
      <div className='calculator' style={{ border: 'dashed 4px yellow' }}>
        <div className='calc-history' style={{ border: 'dashed 4px pink' }}>
          <MyHistory history={this.state.history}></MyHistory>
        </div>
        <div className='calc-display' style={{ border: 'dashed 4px orange' }}>
          <MyDisplay inputValue={this.state.display} isValidFormula={this.state.isValidFormula}></MyDisplay>
        </div>
        <p>{this.state.isValidFormula ? 'VALID FORMULA' : 'INVALID FORMULA'} :- {this.state.display}</p>
        <div className='calc-button-panel' style={{ border: 'dashed 4px purple' }}>{buttonLayout}</div>
      </div>
    )
  }
}


function App() {
  return (
    <Calculator>
    </Calculator>
  );
}

export default App;
