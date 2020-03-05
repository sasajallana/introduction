import React from 'react';
import titlebg from './img/titlebg.png';

export default class BlogPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: ""
    }
    this.getWidth = this.getWidth.bind(this);
    this.returnString = this.returnString.bind(this);
    this.host = "http://localhost:8080";
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
      return (
        this.props.image.contentUrl
      )
    }
  }

  render() {

    const image = this.retrieveImage();
    const imgStyle = {
      backgroundImage: 'url(' + this.host + image + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }
    console.log(imgStyle)

    return(
      <div className="blogs post">
        <div className="post contents" style={imgStyle}>
          <div className="left1"></div>
          <div className="left2"></div>
          <div className="middle">
            <div className="middle title">{this.props.title}</div>
            <div className="middle desc">
              {this.props.tag}
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
    )
  }
}