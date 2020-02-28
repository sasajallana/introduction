import React from 'react';
import BlogList from './BlogList';

export default class BlogWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allBlogs: [],
      blogFilters: [],
      keywordBlogs: [],
      keyword: '',
      dummy: '',
      render: false
    }
    this.getAllBlogs = this.getAllBlogs.bind(this); 
    this.getKeywordsFromAllBlogs = this.getKeywordsFromAllBlogs.bind(this);
    this.setFiltersFromKeywords = this.setFiltersFromKeywords.bind(this);
    this.getBlogsFromKeywords = this.getBlogsFromKeywords.bind(this);
    this.tester = this.tester.bind(this);
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
    return keywords;
  }

  setFiltersFromKeywords(keywords) {
    if(this.state.blogFilters.length == 0 && keywords.length !== 0) {
      this.setState({
        blogFilters: keywords
      })
    } else if(this.state.blogFilters > 0) {
      return;
    }
  }

  getBlogsFromKeywords(keyword) {
    var fetcher = "http://localhost:8080/o/headless-delivery/v1.0/sites/20123/blog-postings/?filter=keywords/any(k:k eq '" + keyword + "')";
    fetch(fetcher, {
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
        keyword: keyword,
        keywordBlogs: data.items 
      })
    });
  }

  tester() {
    var keywords = this.getKeywordsFromAllBlogs();
    var result = {};
  }

  componentWillMount() {
    this.getAllBlogs();
  }

  componentDidUpdate() {    
    this.setFiltersFromKeywords(this.getKeywordsFromAllBlogs());
  }

  render() {
    const { blogFilters, keywordBlogs, render } = this.state;
    
    console.log(this.state.allBlogs);
    console.log(this.state.keywordBlogs);
    console.log(this.tester());

    return (
      <div>
        <p>{this.state.blogFilters}</p>
      </div>
    )
  }
}

