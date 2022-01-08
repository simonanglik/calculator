import './App.css';
import React, { Component } from 'react';

// See https://medium.com/@shuseel/how-to-create-a-simple-calculator-using-html-and-javascript-50a83cb2b90e

class MyButton extends React.Component {
  render() {
    return (
      <button className='calc-button' onClick={this.props.onClick} key={this.props.faceValue}>
        {this.props.faceValue}
      </button>
    )
  }
}

class MyHistory extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.myRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    var historyWindow = [];

    this.props.history.forEach(function (line, index) {
      historyWindow.push(<p className='history-line' key={index}>{line}</p>);
    })

    return (
      <div>
        {historyWindow}
        <div ref={this.myRef} />
      </div>
    )
  }
}

class MyDisplay extends React.Component {
  render() {
    var formulaClass = (this.props.isValidFormula) ? 'good-formula' : 'bad-formula';

    return (
      <input className={['calc-display', formulaClass].join(' ')} readOnly value={this.props.inputValue}></input>
    )
  }
}

const MyRow = (props) => {
  var row = [];

  props.buttons.forEach(function (button) {
    row.push(<MyButton onClick={() => props.onClick(button)} faceValue={button} key={button}></MyButton>);
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
      isValidFormula: true,
      isResult: false
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
          eval((this.state.isResult ? '' : this.state.display) + i);
        } catch { //  (e instanceof SyntaxError) do we want to test for SyntaxErrors ?
          isValidFormula = false;
        }
        this.setState(state => ({
          display: (state.isResult ? '' : state.display) + i,
          isValidFormula: isValidFormula,
          isResult: false
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
        if(this.state.display.length === 0) {
          this.setState(state => ({
            history: state.history.slice(0,0)
          }));
        }
        this.setState({
          display: '',
          isValidFormula: true,
          isResult: false
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
          isValidFormula: isValidFormula,
          isResult: false
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
          isValidFormula: isValidFormula,
          isResult: false
        }));
        break;
      case 'x²':
        try {
          eval(this.state.display);
          this.setState(state => ({
            history: state.history.concat([state.display + '^2=' + eval(state.display) * eval(state.display)]),
            display: String(eval(state.display) * eval(state.display)),
            isValidFormula: true,
            isResult: true
          }));
        } catch {
          this.setState({ isValidFormula: false });
        }
        break;
      case '√':
        try {
          eval(this.state.display);
          this.setState(state => ({
            display: String(Math.sqrt(eval(state.display))),
            isValidFormula: true,
            isResult: true
          }));
        } catch {
          this.setState({ isValidFormula: false });
        }
        break;
      case '=':
        try {
          eval(this.state.display);
          this.setState(state => ({
            history: state.history.concat([state.display + i + eval(state.display)]),
            display: String(eval(state.display)),
            isValidFormula: true,
            isResult: true
          }));
        } catch {
          this.setState({ isValidFormula: false });
        }
        break;
      default:
        alert('default error');
        break;
    }
  }

  createRowOfButtons(buttons) {
    return <MyRow onClick={(i) => this.buttonClicked(i)} buttons={buttons} key={buttons.join('')}></MyRow>;
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

    calcButtons.forEach((buttons) => {
      buttonLayout.push(this.createRowOfButtons(buttons));
    });

    return (
      <div className='calculator red-border'>
        <div className='calc-history yellow-border'>
          <MyHistory history={this.state.history}></MyHistory>
        </div>
        <div className='calc-display-container green-border'>
          <MyDisplay inputValue={this.state.display} isValidFormula={this.state.isValidFormula}></MyDisplay>
        </div>
        <div className='calc-message blue-border'>
          <div className='message-line'>{this.state.isValidFormula ? 'VALID FORMULA' : 'INVALID FORMULA'}</div>
          <div className='message-line' style={{textAlign:'right'}}>{this.state.isResult ? 'RESULT' : ''}</div>
        </div>
        <div className='calc-button-panel pink-border'>{buttonLayout}</div>
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
