import React from 'react';

export default class BlogPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: ""
    }
    this.getWidth = this.getWidth.bind(this);
    this.returnString = this.returnString.bind(this);
    this.host = "http://localhost:8080/";
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

  retrieveImage() {
    if(this.props.image !== null) {
    const divStyle = {
      backgroundImage: url(this.host + this.props.image.contentUrl)
    };
      return (
        <div 
          className="bloglist post image"
          style={divStyle}></div>
      )
    }
  }

  render() {
    this.retrieveImage();
    return(
      <div className="bloglist post">
        <div className="bloglist post title">{this.props.title}</div>
        <p>{this.props.date}</p>
        <p>{this.props.tag}</p>
        {this.retrieveImage()}
      </div>
    )
  }
}