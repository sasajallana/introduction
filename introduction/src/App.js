import React, { Component } from 'react';
import BlogWindow from './components/Blogs/BlogWindow';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: []
    }
  }

    render() {
      return (
        <BlogWindow/>
      )
    }
  }

export default App;