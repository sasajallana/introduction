import React from 'react';
import BlogPost from './BlogPost';
import './style/blogs.scss';

export default class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: this.props.data,
      blogPosts: [],
      render: false
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
        blogPosts: data.items
      })
    });
  }

  renderBlogs() {
    var body = [];
    if(this.state.blogPosts !== 0 && this.state.render == false) {
      this.setState({
        render: true
      });
    }

    if(this.state.render == true) {
      body = this.state.blogPosts.map((post, i) => {
        return (
          <BlogPost 
            id={i}
            title={post.headline}
            tag={post.alternativeHeadline}
            date={post.dateCreated}
            body={post.articleBody}
            total={this.state.blogPosts.length}
          />
        )
      });
    }
    return body;
  }

  componentDidMount() {
    this.getBlogsFromKeywords(this.props.title);
  }

  render() {
    const { title, data, id } = this.props;
    const { blogPosts } = this.state; 

    console.log(blogPosts);

    return (
      <div className={"bloglist " + title.replace(/ /g,'')}>
        <div className={"blogrow"}>
          <div className={"blogrow container"}>
            <div className="bloglist title">{title}</div>
            <div className={"blogposts"}>
              {this.renderBlogs()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
