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
        <div className="bloglist post title">{this.props.title}</div>
        <p>{this.props.date}</p>
        <p>{this.props.tag}</p>
      </div>
    )
  }
}