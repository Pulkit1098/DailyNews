import React, {useEffect, useState} from "react";
import Loading from "./Loading";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title = `${Capitalize(props.category)} - dailyNews`;
  
  const Capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const update = async (page)=> {
    props.setProgress(1);
  
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseddata = await data.json();
    props.setProgress(60);

    setArticles(parseddata.articles)
    setTotalResults(parseddata.totalResults)
    setLoading(false)

    props.setProgress(100);
  }

  useEffect(() => {
    update(page);
  }, [])

  const fetchMoreData = async () => {
    const newPage = page + 1;
    setPage(newPage)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${newPage}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parseddata = await data.json();
    setArticles(articles.concat(parseddata.articles))
    setTotalResults(parseddata.totalResults)
};

    return (
      <>
        <h1 className="text-center my-4">
          dailyNews - Top {Capitalize(props.category)} Headlines
        </h1>
        {loading && <Loading/>}
        <div className="container" style={{ overflow: "hidden", position: "relative"}}>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading/>}
          style={{ overflow: "visible" }}
        >

        <div className="row">
          {articles.map((element, index) => {
              return (
                  <div className="col-md-4" key={`${element.url}-${index}`}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 50) : ""}
                  description={
                      element.description ? element.description.slice(0, 90) : ""
                    }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://images.nintendolife.com/d7f7979dff679/1280x720.jpg"
                  }
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
         </div>
        
        </InfiniteScroll>
        </div>

      </>
    );
  }

const defaultProps = {
  pageSize: 9,
  country: "us",
  category: "general",
};
const propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
