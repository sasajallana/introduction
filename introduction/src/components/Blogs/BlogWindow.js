import React from 'react';
import BlogList from './BlogList';

export default class BlogWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allBlogs: [],
      blogFilters: [],
      ecoBlogs: [],
      volunteerBlogs: []
    }
    this.getAllBlogs = this.getAllBlogs.bind(this); 
    this.getKeywordsFromState = this.getKeywordsFromState.bind(this);
    this.setFiltersFromKeywords = this.setFiltersFromKeywords.bind(this);
    this.getBlogsByKeyword = this.getBlogsByKeyword.bind(this);
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

  getBlogsByKeyword(keyword) {
    var blogs = [];
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
      blogs.push(data.items);
    });
    return blogs;
  }

  getKeywordsFromState() {
    var keywords = [];

    if(this.state.allBlogs.length !== 0) {
      const posts = this.state.allBlogs.map((post) =>
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

  componentWillMount() {
    this.getAllBlogs();
  }

  componentDidUpdate() {    
    this.setFiltersFromKeywords(this.getKeywordsFromState());
  }

  render() {
    const { blogFilters } = this.state;
    const blogs = [];

    if(blogFilters.length !== 0) {
      for(var i = 0; i < blogFilters.length; i++) {
        blogs.push(
          <BlogList 
            data={this.getBlogsByKeyword(blogFilters[i])}
            keyword={blogFilters[i]}
          /> 
        )
      }
    }

      return (
        <div>
          {blogs}
        </div>
      )
  }
}

// http://localhost:8080/o/headless-delivery/v1.0/sites/20123/blog-postings/?filter=keywords/any(k:k eq 'volunteer')
// http://localhost:8080/o/headless-delivery/v1.0/sites/20123/blog-postings/?filter=keywords/any(k:k eq 'environmental organizations')