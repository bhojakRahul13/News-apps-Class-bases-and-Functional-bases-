import React  from 'react'

 const  NewItems=(props)=> {
    
    
      let  { title, description,ImageUrl ,newUrl ,author,date} = props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={ImageUrl ? ImageUrl :  "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/7AAC/production/_120340413_virat_kohli_getty9.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title"> {title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By <strong> { author ? author :"unknow"} </strong> on {new Date(date).toGMTString()}</small></p>
                        <a href={newUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                        <p></p>    
                    </div>
                </div>
            </div>
        )
    
}

export default NewItems;