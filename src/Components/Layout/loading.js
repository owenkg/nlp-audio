import React from 'react'
import gif from '../../images/loading.gif'


const Loading = (props) => {
    return (
        <>{
            props.width && props.height ?
                <div className="container d-flex justify-content-center pt-5 mt-5">
                    <img src={gif} alt="loading.." width={props.width} height={props.height} />
                </div>
                :
                <div className="container d-flex justify-content-center pt-5 mt-5">
                    <img src={gif} alt="loading.." width="10%" height="10%" />
                </div>
        }
        </>
    )
}

export default Loading
