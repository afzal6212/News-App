import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
   let {title,description,imageUrl,newsUrl,author,date,source}= this.props;
    return (
      <div className="md-3">
        <div className="card" >
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}> {source}
</span>
          <img src={!imageUrl?"https://cdn.vox-cdn.com/thumbor/1L6awTcXjbADLDMFfR9g1r5lzDc=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/23986640/acastro_STK092_04.jpg":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}
            </h5>
            <p className="card-text">{description}</p>
            <p class="card-text"><small className="text-muted">By {!author?"unkown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark ">Read</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem;