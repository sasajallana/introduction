import React from 'react';

export default class BlogList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [],
      title: []
    }
  }
}
