import React from 'react';
import './styles/Notification.css'

const Notification =({notification})=>{
    if(notification.includes('added')){
        return(
            <div className="success">
                {notification}
            </div>
        )
    }
    else if(notification.includes('deleted') ||  notification.includes('failed')){
        return(
            <div className="danger">
                {notification}
            </div>
        )
    }
    else if(notification.includes('updated')){
        return(
            <div className="info">
                {notification}
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