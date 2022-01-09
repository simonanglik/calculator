import React, { Component } from "react";

class CalcHistory extends Component {
  constructor(props) {
    super(props);
    this.scrollToRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.scrollToRef.current.scrollIntoView({ behavior: "smooth" });
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
      <div>
        {historyWindow} <div ref={this.scrollToRef} />
      </div>
    );
  }
}

export default CalcHistory;
