import React from 'react'
import gif from '../../images/loading.gif'


const Loading = () => {
    return (
        <div className="container d-flex justify-content-center pt-5 mt-5">
            <img src={gif} alt="loading.." width="10%" height="10%"/>
        </div>
    )
}

export default Loading
