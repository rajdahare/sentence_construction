import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Question from './components/Question'
import Results from './components/Results'

// API endpoint that works in both development and production
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/questions'

function App() {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchQuestions = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error('Failed to fetch questions. Please try again later.')
      }
      const data = await response.json()
      setQuestions(data)
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  useEffect(() => {
    if (!isGameComplete && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isGameComplete, timeRemaining])

  const handleAnswer = (answers) => {
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = answers.every(
      (answer, index) => answer === currentQuestion.correctAnswers[index]
    )

    setUserAnswers([
      ...userAnswers,
      {
        questionId: currentQuestion.id,
        userAnswers: answers,
        isCorrect,
      },
    ])

    if (isCorrect) {
      setScore((prev) => prev + 1)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setTimeRemaining(30)
    } else {
      setIsGameComplete(true)
    }
  }

  const handleTimeUp = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setTimeRemaining(30)
    } else {
      setIsGameComplete(true)
    }
  }

  const handleReset = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setTimeRemaining(30)
    setIsGameComplete(false)
    setScore(0)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading questions...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-xl text-error mb-4 text-center">{error}</div>
        <button
          onClick={fetchQuestions}
          className="btn btn-primary"
        >
          Retry Loading Questions
        </button>
        <div className="mt-4 text-sm text-gray-600 text-center">
          {import.meta.env.PROD 
            ? "There was an error loading the questions. Please try again later."
            : "Make sure to run the JSON server using: npm run server"}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Sentence Construction
        </h1>

        {!isGameComplete ? (
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            timeRemaining={timeRemaining}
            onTimeUp={handleTimeUp}
          />
        ) : (
          <Results
            userAnswers={userAnswers}
            questions={questions}
            score={score}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  )
}

export default App
