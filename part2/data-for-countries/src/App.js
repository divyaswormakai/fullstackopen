import React, {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [toShowList, setToShowList] = useState([])
  const [singleCountry, setSingleCountryStatus] = useState({})
  const [toShowListAble, settoShowListAble] = useState(false)
  const [filter, setFilter] = useState('')

  const[countryDetails, setCountryDetails] = useState({})
  const[weatherDetails, setWeatherDetails] = useState({})
  const [weatherLoaded, setWeatherLoaded] = useState(false)

  useEffect(()=>{
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((response)=>{
      setCountries(response.data)
      console.log(response.data.length)
    })
    console.log(process.env.REACT_APP_WEATHER_API)
  },[])

  const handleFilterChange=(ev)=>{
    setFilter(ev.target.value)
    setCountryDetails({})
    if(ev.target.value === '' || ev.target.value.length <=0){
      setToShowList([{name: ''}])
      
    }
    else{
      const objs = countries.filter(elem=>elem.name.toLowerCase().includes(ev.target.value.toLowerCase()))
      if(objs.length ===0){
        setToShowList([{name: 'No country found'}])
        setSingleCountryStatus({})
        settoShowListAble(false)
      }
      else if(objs.length ===1){
        setSingleCountryStatus(objs[0])
        console.log(objs[0])
      }
      else if(objs.length >=10){
        setToShowList([{name: 'Too many matches, specify another filter'}])
        setSingleCountryStatus({})
        settoShowListAble(false)
      }
      else{
        setToShowList(objs)
        setSingleCountryStatus({})
        settoShowListAble(true)
      }
    }
  }

  const HandleSetCountryDetails=(elem)=>{
    setCountryDetails(elem)
    const api_key = '539b1e19a22a0b6c504e635c725ace66'
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${elem.name}`
    axios
    .get(url)
    .then(res=>{
      setWeatherDetails(res.data)
      setWeatherLoaded(true)
    })
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
          {toShowListAble?
            toShowList.map(elem=>{
              return(
                <div key={elem.name}>
                  <p>
                    {elem.name}&nbsp;
                    <button onClick={()=>HandleSetCountryDetails(elem)}>Show</button>
                  </p>
                  
                </div>
              )
            }):
            toShowList.map(elem=>{
              return(
                <div key={elem.name}>
                  <p>{elem.name}</p>
                </div>
              )
          })
          }
        </div>
      )}

      {countryDetails.hasOwnProperty('name')?(
        <div className="countryStats" >
        <h1>{countryDetails.name}</h1>
        <p>Capital: {countryDetails.capital}</p>
        <p>Population: {countryDetails.population}</p>
        <h3>Languages</h3>
        <ul>
          {countryDetails.languages.map(lang=>{
            return(<li key={countryDetails.name+lang.name}>{lang.name}</li>)
          })}
        </ul>
        {weatherLoaded?(
          <>
            <img src={countryDetails.flag} alt="flag" width="100" height="100"/>
            <h3>Weather in {weatherDetails.location.name}</h3>
            <p><b>Temperature: {weatherDetails.current.temperature} Celsius</b></p>
            <img src={weatherDetails.current.weather_icons[0]} alt="flag" width="75" height="75"/>
            <p><b>wind:</b> {weatherDetails.current.wind_speed} mph direction {weatherDetails.current.wind_dir} </p>
          
          </>):null}
          </div>
      ):null}
    </div>

  );
}

export default App;
