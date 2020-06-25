import React from 'react';

const Numbers =({saveName,handleFilterChange,filter})=>{
    return(
        <>
            <h2>Phonebook</h2>
            <form onSubmit={saveName}>
                <div>
                Filter to shown with: <input onChange={handleFilterChange} value={filter}/>
                </div>
            </form>
        </>
    )
}

export default Numbers