import React from 'react';

const SingleNumber =({number,deleteNumber})=>{
    return(
        <>
            <p>
                {number.name} : {number.number}&nbsp;&nbsp;
                <button onClick={()=>deleteNumber(number)}>
                    Delete
                </button>
            </p>
        </>
    )
}

export default SingleNumber