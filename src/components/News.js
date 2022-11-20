import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps = {
        page: 1,
        pageSize: 6,
        country: "us",
        category: "general",
        totalReaults: 0,
    };

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        // console.log("News class constructor");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
        };

        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`
    }

    async updateNews() {
        this.props.setProgress(0)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.props.setProgress(50)
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.props.setProgress(70)
        this.setState({
            articles: parsedData.articles,
            totalReaults: parsedData.totalReaults,
            loading: false,
        });
        this.props.setProgress(100)
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e332278873f4c6284c548a95e14289c&page=1&pagesize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // // console.log(parsedData);

        // this.setState({
        //     articles: parsedData.articles,
        //     // page: 1,
        //     loading: false,
        // });

        this.updateNews()
    }

    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e332278873f4c6284c548a95e14289c&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);

        await this.setState({
            // articles: parsedData.articles,
            page: this.state.page - 1,
            // loading: false,
        });
        this.updateNews();
    };

    handleNextClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e332278873f4c6284c548a95e14289c&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // // console.log(parsedData);

        await this.setState({
            // articles: parsedData.articles,
            page: this.state.page + 1,
            // loading: false,
        });

        this.updateNews();
    };

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1,
        });

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e332278873f4c6284c548a95e14289c&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalReaults: parsedData.totalReaults,
        });
    };

    render() {
        return (
            <>
                <h2 className="text-center my-3">NewsMonkey - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h2>
                {/* Spinner shows only when loading is true */}
                {/* {this.state.loading && <Spinner />} */}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalReaults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {/* news items shows only when loading is false */}
                            {!this.state.loading && this.state.articles.map((element) => {
                                return (
                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem
                                            // key={element.id}
                                            title={element.title ? element.title : ""}
                                            description={element.description ? element.description.slice(0, 100) : ""}
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
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
