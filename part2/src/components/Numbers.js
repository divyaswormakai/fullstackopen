import React from 'react';
import SingleNumber from './SingleNumber';

const Numbers =({numbers})=>{
    return(
        <>
            {numbers.map((num)=> <SingleNumber key={num} number={num}/>)}
        </>
    )
}

export default Numbers