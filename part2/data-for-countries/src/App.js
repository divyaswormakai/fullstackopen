import React, {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [toShowList, setToShowList] = useState([])
  const [singleCountry, setSingleCountryStatus] = useState({})
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((response)=>{
      setCountries(response.data)
      console.log(response.data.length)
    })
  },[])

  const handleFilterChange=(ev)=>{
    setFilter(ev.target.value)

    if(ev.target.value === '' || ev.target.value.length <=0){
      setToShowList([{name: ''}])
    }
    else{
      const objs = countries.filter(elem=>elem.name.includes(ev.target.value))
      if(objs.length ===0){
        setToShowList([{name: 'No country found'}])
        setSingleCountryStatus({})
      }
      else if(objs.length ===1){
        setSingleCountryStatus(objs[0])
        console.log(objs[0])
      }
      else if(objs.length >=10){
        setToShowList([{name: 'Too many matches, specify another filter'}])
        setSingleCountryStatus({})
      }
      else{
        setToShowList(objs)
        setSingleCountryStatus({})
      }
    }
  }

  return (
    <div className="App">
      Find Countries: <input onChange={handleFilterChange} value={filter}/>
      <br/>
      {singleCountry.hasOwnProperty('name')?(
        <div className="countryStats">
          <h1>{singleCountry.name}</h1>
          <p>Capital: {singleCountry.capital}</p>
          <p>Population: {singleCountry.population}</p>
          <h3>Languages</h3>
          <ul>
            {singleCountry.languages.map(lang=>{
              return(<li>{lang.name}</li>)
            })}
          </ul>
          <img src={singleCountry.flag} alt="flag" width="100" height="100"/>
        </div>
      ):(
        <div>
          {toShowList.map(elem=>{
            return(
              <p>{elem.name}</p>
            )
          })}
        </div>
      )}
    </div>

  );
}

export default App;
