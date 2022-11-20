import React, { Component } from "react";

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="my-3 mx-3">
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '80%', zIndex: '1' }}>
                        {source}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <a
                            href={newsUrl}
                            target="_blank"
                            className="btn btn-sm btn-primary"
                        >
                            Read more
                        </a>
                        <p className="card-text"><small className="text-muted">by <strong>{!author ? "Unknown" : author}</strong> on <em>{new Date(date).toUTCString()}</em></small></p>
                    </div>
                </div>
            </div>
        );
    }
}
