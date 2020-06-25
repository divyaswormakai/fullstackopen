import React from 'react';

const Numbers =({saveName,handleNameChange,newName,handleNumberChange, newNumber})=>{
    return(
        <>
            <h2>Add a new contact</h2>
            <form onSubmit={saveName}>
                <div>
                Name: <input onChange={handleNameChange} value={newName}/>
                </div>
                <br/>
                <div>
                Number: <input onChange={handleNumberChange} value={newNumber} type="number"/>
                </div>
                <br/>
                <div>
                <button type="submit">ADD</button>
                </div>
            </form>
        </>
    )
}

export default Numbers