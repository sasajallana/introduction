import React from 'react';

import './style/blogs.scss';

export default class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.formatDate = this.formatDate.bind(this);
  }

  formatDate(createDate) {
    var result = "Published on ";
    var reg = /.+?(?=\T)/;
    result += reg.exec(createDate);
    return result;
  }

  render() {
    return (
      <div className="post">
          <div className="post-title">{this.props.title}</div>
          <div className="post-sub">{this.props.sub}</div>
          <div className="post-date">{this.formatDate(this.props.date)}</div>
          <div className="post-body">{this.props.body}</div>
      </div>
    )
  }
}
