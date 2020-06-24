import React,{useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick,text})=>{
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic=({text, stat})=>{
  return(
    <>
        <td>{text}:</td>
        <td>{stat}</td>
    </>
  )
}
const Statistics=({stats})=>{
  let good = stats[0];
  let neutral = stats[1];
  let bad = stats[2];
  let total = stats.reduce((finalVal,curVal)=>finalVal+curVal);
  let avg = (good-bad)/total
  let positive = good/total*100

  if(total ===0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <>
      <table>
        <tbody>
        <tr><Statistic text={"Good"} stat ={good}/></tr>
        <tr><Statistic text={"Neutral"} stat ={neutral}/></tr>
        <tr><Statistic text={"Bad"} stat ={bad}/></tr>
        <tr><Statistic text={"All"} stat ={total}/></tr>
        <tr><Statistic text={"Average"} stat ={avg}/></tr>
        <tr><Statistic text={"Positive"} stat ={positive}/></tr>
        </tbody>
      </table>
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
          <Statistics stats ={[good,neutral,bad]}/>
      </div>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))