

import React from 'react'
import WarningIcon from '@material-ui/icons/Warning';

const MissingField = ({message, title}) => {
    return (
        <div className="container">
            <div> 
                <div className="icon">
                <WarningIcon/> 
                <div className="title">{title}</div>

                <div className="message"> {message}</div>

                </div>

                 
                </div>

            
            <style jsx>{`
                    
                    .container {
                       background-color: #FDECE9;
                       padding: 10px 0;
                       margin: 10px 50px;
                       
                       
                       color:red; 
                       border-radius: 5px;
                    }
                    .icon{
                        padding:5px;
                    }

                    .title{
                        font-size: 15px;
                        font-weight: bold;
                        
                    }

                    .message{
                        padding-top: 10px;
                        font-size: 11px;
                    }

                    `}</style>
        </div>
    )
}

export default MissingField
