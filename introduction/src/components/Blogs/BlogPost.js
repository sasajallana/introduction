import React from 'react';

export default class BlogPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
    this.getWidth = this.getWidth.bind(this);
  }

  getWidth() {
    return (1 / this.props.total) * 100;
  }

  render() {
    return(
      <div className="bloglist post" style={{width: this.getWidth + '%'}}>
        <p>{this.props.title}</p>
        <p>{this.props.date}</p>
        <p>{this.props.body}</p>
        <p>{this.props.total}</p>
      </div>
    )
  }
}