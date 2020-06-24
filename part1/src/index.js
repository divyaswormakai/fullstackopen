import React,{useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick,text})=>{
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Display=({stats})=>{
  return(
    <>
      <p>Good: {stats[0]}</p>
      <p>Neutral: {stats[1]}</p>
      <p>Bad: {stats[2]}</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick =()=>{
    setGood(good+1);
  }

  const handleBadClick =()=>{
    setBad(bad+1);
  }

  const handleNeutralClick=()=>{
    setNeutral(neutral+1);
  }
  return (
    <div>
      <h1>Give Feedback</h1>
      <div className="feedback">
      <Button text={"Good"} handleClick = {handleGoodClick}/>
      <Button text={"Neutral"} handleClick = {handleNeutralClick}/>

      <Button text={"Bad"} handleClick = {handleBadClick}/>
      </div>
      <h1>Statistics</h1>
      <div>
          <Display stats ={[good,neutral,bad]}/>
      </div>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))