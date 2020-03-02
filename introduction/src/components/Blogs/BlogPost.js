import React from 'react';

export default class BlogPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
    this.getWidth = this.getWidth.bind(this);
    this.returnString = this.returnString.bind(this);
  }

  getWidth() {
    return (1 / this.props.total) * 100;
  }

  returnString(toString) {
    var string = document.createElement("p");
    string.innerHTML = toString;
    var text = string.textContent || string.innerText || "";
    return text; 
  }

  render() {
    return(
      <div className="bloglist post" style={{width: this.getWidth + '%'}}>
        <p>{this.props.title}</p>
        <p>{this.props.date}</p>
        <p>{this.returnString(this.props.body)}</p>
        <p>{this.props.total}</p>
      </div>
    )
  }
}