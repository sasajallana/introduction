import React from 'react';

export default class BlogList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
      
    // }
  }

  render() {
    const { data, keyword } = this.props;
    console.log(typeof data);
    return (
      <div>
        <h1>{keyword}</h1>
        <ul>
          
        </ul>
      </div>
    )
  }
}
