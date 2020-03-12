import React from 'react';
import ReactDOM from 'react-dom';

import BlogPost from './BlogPost';

export default class BlogListItem extends React.Component {
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

  displayBlog = () => {
    const element = (
      <BlogPost 
        title={this.props.title}
        sub={this.props.tag}
        body={this.returnString(this.props.body)}
        date={this.props.date}
      ></BlogPost>
    );
    ReactDOM.render(element, document.getElementById('blogContainer-display'));
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
      <div className="blogs-posts" style={imgStyle} onClick={this.displayBlog}>
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