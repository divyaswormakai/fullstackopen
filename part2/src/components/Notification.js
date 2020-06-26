import React from 'react';
import './styles/Notification.css'

const Notification =({notification})=>{
    if(notification.includes('added')){
        return(
            <div className="success">
                "Added portion"
            </div>
        )
    }
    else if(notification.includes('deleted')){
        return(
            <div className="danger">
                "Deleted portion"
            </div>
        )
    }
    else if(notification.includes('updated')){
        return(
            <div className="info">
                "Updated portion"
            </div>
        )
    }
    else{
        return(
            <>
            </>
        )
    }
}

export default Notification