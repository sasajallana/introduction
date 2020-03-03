import React from 'react';
import BlogList from './BlogList';
import './style/blogs.scss';

export default class BlogWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBlogs: [],
      keywords: [],
    }
    this.getAllBlogs = this.getAllBlogs.bind(this); 
    this.getKeywordsFromAllBlogs = this.getKeywordsFromAllBlogs.bind(this);
  }

  getAllBlogs() {
    fetch('http://localhost:8080/o/headless-delivery/v1.0/sites/20123/blog-postings/', {
      "async": true,
      "crossDomain": true,
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
        "Authorization": "Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0ZQ=="
      }
    })
    .then((res) => { 
        if (!res.ok) throw new Error();
          else return res.json();
    })
    .then((data) => {
      this.setState({ 
        allBlogs: data.items 
      })
    });
  }

  getKeywordsFromAllBlogs() {
    var keywords = [];
    if(this.state.allBlogs.length !== 0) {
      this.state.allBlogs.map((post) =>
        post.keywords.map((keyword) => {
          if(keywords.indexOf(keyword) > -1) {
            return;
          } else {
            keywords.push(keyword);
          }
        }
      ))
    }
    if(this.state.keywords.length == 0) {
      this.setState({
        keywords: keywords
      })
    }
  }

  componentWillMount() {
    this.getAllBlogs();
  }

  componentDidUpdate() {    
    this.getKeywordsFromAllBlogs();
  }

  componentDidMount() {
    console.log(window.innerHeight + " :height");
    console.log(window.innerWidth + " :width");
  }

  render() {
    const { allBlogs, keywords } = this.state;

    const posts = keywords.map((keyword, i) => {
      return (
        <BlogList id={i} title={keyword} data={allBlogs}/>
      );
    });


    return (
      <div className="blogContainer">
        <div className="blogContainer all">
          {posts}
        </div>
        <div className="blogContainer display">
          <p>ege</p>
        </div>
      </div>
    )
  }
}
