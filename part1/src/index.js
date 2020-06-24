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

const HighestAnectode=({anecdotes,points})=>{
  let ind = points.indexOf(Math.max(...points))
  return(
    <div className="MostVoted">
      <h1>Anectode with most votes:</h1>
      {anecdotes[ind]}
    </div>
  )
}

const App = ({anecdotes}) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0);
  const [points,setPoints] = useState(Array(anecdotes.length).fill(0))

  const handleGoodClick =()=>{
    setGood(good+1);
  }

  const handleBadClick =()=>{
    setBad(bad+1);
  }

  const handleNeutralClick=()=>{
    setNeutral(neutral+1);
  }

  const randomAnecdote=()=>{
    let random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);    
  }

  const voteAnectode = ()=>{
    let temp = [...points]
    temp[selected]+=1
    setPoints(temp)
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

      <div className="anecdote">
        {anecdotes[selected]}
        <br/> 
        TotalVotes: {points[selected]}
        <br/>
        <Button text="Vote" handleClick={voteAnectode}/>
        <Button text="Random Anectode" handleClick={randomAnecdote}/>
      </div>

      <HighestAnectode anecdotes={anecdotes} points={points}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))