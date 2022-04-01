import './App.css';
import React, { useState, useEffect } from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import { nanoid } from 'nanoid'
const axios = require('axios')

function App() {

  const [takingQuiz, setTakingQuiz] = useState(false)

  const [allQuestions, setAllQuestions] = useState([])

  const [allAnswers, setAllAnswers] = useState([])

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple')
      .then(res => {
        const newState = res.data.results.slice()

        const questions = newState.map(dataSet => {
          return dataSet.question.replace(/[^a-zA-Z ]/g, "")
        })

        const answers = newState.map(dataSet => {
          let answersArr = dataSet.incorrect_answers.slice()
          answersArr.push(dataSet.correct_answer)
          let finalArr = [
            {answer: answersArr[0], selected: false, correct: false, id: nanoid()}, 
            {answer: answersArr[1], selected: false, correct: false, id: nanoid()}, 
            {answer: answersArr[2], selected: false, correct: false, id: nanoid()}, 
            {answer: answersArr[3], selected: false, correct: true, id: nanoid()}
          ]
          return shuffle(finalArr)
        })
        
        setAllQuestions(questions)
        setAllAnswers(answers)
      })
  }, [])

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  function startQuiz() {
    setTakingQuiz(true)
    console.log(allQuestions)
    console.log(allAnswers)
  }

  function selectAnswer(i, id) {
    let updatedSelect = allAnswers.slice()
    // console.log(prevAnswers)
    let newlySelected = updatedSelect[i].map(answer => {
      if (answer.id === id) {
        return {...answer, selected: true}
      }
      else {
        return {...answer}
      }
    })
    // console.log(newlySelected)
    updatedSelect[i] = [...newlySelected]
    let updateState = updatedSelect.slice()
    console.log(updateState)
    setAllAnswers([...updateState])
    console.log(allAnswers)
  }

  return (
    <div className="App">
      {takingQuiz ? 
        <Quiz 
          allQuestions={allQuestions}
          allAnswers={allAnswers}
          selectAnswer={selectAnswer}
        /> : 
        <Start startQuiz={startQuiz}/>}
    </div>
  );
}

export default App;


