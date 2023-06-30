

 import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import propTypes from 'prop-types'

export class News extends Component {

    static defaultProps={
        country: 'in',
        pageSize:8,
        category:'general'
    }

    static propTypes ={
       country: propTypes.string,
       pageSize: propTypes.number,
       category: propTypes.string
    }

    constructor() {
        super();
        console.log("hello  am constructor from newsapp");
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    

    // async  componentDidMount(){
    //         let url="https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=687cc8c2f94a4292968d44ea5d89b839"
    //              let data=await fetch(url);
    //              let parsedata= await data.json();
    //              console.log(parsedata);
    //              this.setState({articles: parsedata.artices});
    //           }

    async componentDidMount(){
       
        try{   
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=687cc8c2f94a4292968d44ea5d89b839&page=1&pageSize=${this.props.pageSize}`;  
            this.setState({loading:true});
            const res = await fetch(url);
            const data = await res.json();
          
            console.log(data);
            this.setState({
                articles: data.articles,totalResults:data.totalResults,
                loading:false
            });
        }
        catch(e) {
            console.log("something is not working");
            
        }
    }


    // async updateNews(){
    //     const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=687cc8c2f94a4292968d44ea5d89b839&page=${this.state.page}&pageSize=${this.props.pageSize}`; 
    //     this.setState({loading:true});
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         console.log(data);
            
    //            this.setState({
    //             page:this.state.page -1,
    //             articles: data.articles,
    //             loading:false
    //            })


    // }

    handlePrevClick= async()=>{
       

        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=687cc8c2f94a4292968d44ea5d89b839&page=${this.state.page -1}&pageSize=${this.props.pageSize}`; 
        this.setState({loading:true});
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            
               this.setState({
                page:this.state.page -1,
                articles: data.articles,
                loading:false
               })

    //   this.setState({page: this.state.page -1})
    //   this.updateNews()
     }

     handleNextClick=async()=>{
        if((this.state.page+1 >Math.ceil(this.state.totalResult/this.props.pageSize))){

        }
        else{

            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=687cc8c2f94a4292968d44ea5d89b839&page=${this.state.page +1}&pageSize=${this.props.pageSize} `;
            this.setState({loading:true});
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            
               this.setState({
                page:this.state.page +1,
                articles: data.articles,
                loading:false
               })
        }
    //   this.setState({page:this.state.page +1})
    //   this.updateNews()
     }


    render() {

        return (
            <div className="container my-3 navbar-light bg-light" >
                <h2 className='text-center' style={{margin: '35px 0px' }} >NewsApp Top Headlines</h2>
                {this.state.loading&&<Spinner/>}

                This is today's news.
                <div className='row'>
                    {this.state.articles?.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem tittle={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} 
                            author={element.author} date={element.publishedAt} source={element.source.name}
                            />
                        </div>
                    })}



                </div>
                 <div className="container d-flex justify-content-between">
                 <button disabled={this.state.page<=1} type="button" className="btn btn-info" onClick={this.handlePrevClick}>&larr; Previous</button>
                 <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>
                 </div>
            </div>
        )
    }
}

export default News