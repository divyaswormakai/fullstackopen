import React from 'react';
import SingleNumber from './SingleNumber';

const Numbers =({numbers})=>{
    return(
        <>
        <h2>Numbers</h2>
            {numbers.map((num)=> <SingleNumber key={"Num"+num.name} number={num}/>)}
        </>
    )
}

export default Numbers