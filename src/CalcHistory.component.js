import React, { Component } from "react";

class CalcHistory extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    var historyWindow = [];

    this.props.history.forEach(function (line, index) {
      historyWindow.push(
        <p className="history-line" key={index}>
          {line}
        </p>
      );
    });

    return (
      <div className="red-border">
        {historyWindow} <div ref={this.myRef} />
      </div>
    );
  }
}

export default CalcHistory;
