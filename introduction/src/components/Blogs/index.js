import React from 'react';

export default class Blog extends React.Component {
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

  getEcoBlogs() {
    fetch("http://localhost:8080/o/headless-delivery/v1.0/sites/20123/blog-postings/?filter=keywords/any(k:k eq 'environmental organizations')", {
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
        ecoBlogs: data.items 
      })
    });
  }

  getVolunteerBlogs() {
    fetch("http://localhost:8080/o/headless-delivery/v1.0/sites/20123/blog-postings/?filter=keywords/any(k:k eq 'volunteer')", {
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
        volunteerBlogs: data.items 
      })
    });
  }

  /* Function
    Name: getKeywordsFromState
    Param: none

    Description: Get unique keywords that correspond to 'tags' on Blog data types in Liferay DXP 7.2 
    Is used in order to further filter Blog lists by a specific topic/tag. Retrieves from the 
    data GET blog-postings headless API 'keywords' key value. 
  */

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

  /* Function
    Name: setFiltersFromKeywords
    Param: none

    Description: 
  */
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
    this.getEcoBlogs();
  }

  componentDidUpdate() {    
    this.setFiltersFromKeywords(this.getKeywordsFromState());
  }

  render() {
    console.log(this.state.allBlogs);
    console.log(typeof this.state.allBlogs[0]);
    console.log(this.state.allBlogs[0]);

    console.log(this.getBlogsByKeyword('volunteer'));

      return (
        <p>{this.state.blogFilters}</p>
      )
  }
}

// http://localhost:8080/o/headless-delivery/v1.0/sites/20123/blog-postings/?filter=keywords/any(k:k eq 'volunteer')
// http://localhost:8080/o/headless-delivery/v1.0/sites/20123/blog-postings/?filter=keywords/any(k:k eq 'environmental organizations')