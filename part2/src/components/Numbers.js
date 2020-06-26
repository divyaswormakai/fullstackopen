import React from 'react';
import SingleNumber from './SingleNumber';

const Numbers =({numbers,deleteNumber})=>{
    return(
        <>
        <h2>Numbers</h2>
            {numbers.map((num)=> <SingleNumber key={"Num"+num.name} number={num} deleteNumber={deleteNumber}/>)}
        </>
    )
}

export default Numbers