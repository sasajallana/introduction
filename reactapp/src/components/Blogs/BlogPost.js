import React from 'react';
import titlebg from './img/titlebg.png';

export default class BlogPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      selected: {}
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

  renderPost() {
    if(this.state.selected) {
      return ReactDOM.createPortal(
        this.props.children,
        blogContainer-display
      );
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
      <div className="blogs-posts" style={imgStyle}>
        <div className="blogs-posts-contents">
          <div className="blogs-posts-1"></div>
          <div className="blogs-posts-2"></div>
          <div className="blogs-posts-middle">
            <div className="blogs-posts-middle-title">
              <div className="blogs-posts-middle-title-contents">
                {this.props.title}
              </div>
            </div>
            <div className="blogs-posts-middle-title-desc">
              <div className="blogs-posts-middle-title-desc-inner">
                {this.props.tag}
              </div>
            </div>
          </div>
          <div className="blogs-posts-3">
            <div className="triangle"></div>
          </div>
        </div>
      </div>
    )
  }
}