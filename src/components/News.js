import React, { useState, useEffect } from "react";
import NewItems from "./NewItems";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const { category, pageSize, country, setProgress } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const Capitalized = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    updatNews();
    document.title = `${Capitalized(category)} - NewsMonkey`;
  }, []);

  const updatNews = async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=c24718465f1a46818f2fdfd261a2f776&page=${page}&pageSize=${pageSize}`;
    setLoading(true);

    let data = await fetch(url);
    setProgress(30);

    let parseData = await data.json();
    setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    setProgress(100);
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=c24718465f1a46818f2fdfd261a2f776&page=${page+1}&pageSize=${pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };

  return (
    <>
      <h2 className="text-center" style={{ margin: "35px 0px" ,marginTop:"90px"}}>
        News-App - Top {Capitalized(category)} Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((ele, index) => {
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
};

export default News;
