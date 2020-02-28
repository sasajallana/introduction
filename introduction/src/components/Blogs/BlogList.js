import React from 'react';

export default class BlogList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
      
    // }

  }

  parseData() {

  }

  render() {
    const { data, keyword } = this.props;
    console.log(this.props.data);

    return (
      <div>
        <h1>{keyword}</h1>
          {data.map((blog) =>(
        		<div class="card">
        			<div class="card-body">
        				<h5 class="card-title">{blog.id}</h5>
        				<h6 class="card-subtitle mb-2 text-muted">{blog.headline}</h6>
        				<p class="card-text">{blog.dateCreated}</p>
        			</div>
        		</div>
        	))}
      </div>
    )
  }
}
