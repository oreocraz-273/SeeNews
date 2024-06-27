import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static propTypes = {    
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

    static defaultProps = {
        country: "in",
        category: "science",
        pageSize: 8
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ad9267abc3c4424f8e9732a206eef94c&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
    }

    handlePrev = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ad9267abc3c4424f8e9732a206eef94c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, page: this.state.page - 1, loading: false });
    }

    handleNext = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ad9267abc3c4424f8e9732a206eef94c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, page: this.state.page + 1, loading: false });
    }

    render() {
        return (
            <div>
                <div className="container my-3">
                    <h1 className="text-center" style={{margin: "35px 0px", marginTop: "90px"}}>News Monkey- Top headlines</h1>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {!this.state.loading && this.state.articles?.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} desc={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://cdn.vox-cdn.com/thumbor/fwTu-5MGoC9oCdIukn-54We0KUk=/0x0:3135x1641/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24825167/1580614099.jpg"} newsUrl={element.url} 
                                author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                        })}
                    </div>
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrev} className="btn btn-dark">&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNext} className="btn btn-dark">&rarr; Next</button>
                </div>
            </div>
        )
    }
}

export default News