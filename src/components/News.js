import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
    static defaultProps = {
        page: 1,
        pageSize: 6,
        country: "us",
        category: "general",
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
            loading: false,
            page: 1,
        };

        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e332278873f4c6284c548a95e14289c&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);

        this.setState({
            articles: parsedData.articles,
            loading: false,
        });
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

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center my-3">NewsMonkey - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h2>
                {/* Spinner shows only when loading is true */}
                {this.state.loading && <Spinner />}
                <div className="row">
                    {/* news items shows only when loading is false */}
                    {!this.state.loading &&
                        this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.id}>
                                    <NewsItem
                                        title={
                                            element.title ? element.title : ""
                                        }
                                        description={
                                            element.description
                                                ? element.description.slice(
                                                    0,
                                                    100
                                                )
                                                : ""
                                        }
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
                <div className="container d-flex justify-content-between">
                    <button
                        disabled={this.state.page <= 1}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePrevClick}
                    >
                        &larr; Previous
                    </button>
                    <button
                        disabled={this.state.page >= 8}
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
