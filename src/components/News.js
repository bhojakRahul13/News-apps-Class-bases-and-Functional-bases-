import React, { Component } from "react";
import NewItems from "./NewItems";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  Capitalized = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.Capitalized(this.props.category)} - NewsMonkey`;
  }
  async componentDidMount() {
    this.updatNews();
  }

  async updatNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c24718465f1a46818f2fdfd261a2f776&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(30)
   
    let parseData = await data.json();
    this.props.setProgress(70)
   
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)

  }



  fetchMoreData=async ()=>{
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c24718465f1a46818f2fdfd261a2f776&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles:  this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    });

  }

  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: "35px 0px" }}>
          News-App - Top {this.Capitalized(this.props.category)} Headlines
        </h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((ele, index) => {
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
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
