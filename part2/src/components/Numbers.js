import React from 'react';
import SingleNumber from './SingleNumber';

const Numbers =({numbers})=>{
    return(
        <>
            {numbers.map((num)=> <SingleNumber key={"Num"+num.name} number={num}/>)}
        </>
    )
}

export default Numbers