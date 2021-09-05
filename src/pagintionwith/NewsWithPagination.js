import React, { Component } from "react";
import NewItems from "../components/NewItems";
import Spinner from "../components/Spinner";

export class News extends Component {

  Capitalized =(string) =>{
    return string.charAt(0).toUpperCase()  + string.slice(1);
  }


  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.Capitalized(this.props.category)} - NewsMonkey`;
  }

  

  async updatNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c24718465f1a46818f2fdfd261a2f776&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c24718465f1a46818f2fdfd261a2f776&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    this.setState({page:this.state.page - 1 });
    this.updatNews();
  };

  handleNextClick = async () => {
    this.setState({page:this.state.page +1 });
    this.updatNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top  {this.Capitalized(this.props.category)} Headlines 
        </h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((ele, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewItems
                    title={ele.title ? ele.title : ""}
                    description={ele.description ? ele.description : ""}
                    ImageUrl={ele.urlToImage}
                    newUrl={ele.url}
                    author={ele.author}
                    date={ele.publishedAt}
                  />
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
