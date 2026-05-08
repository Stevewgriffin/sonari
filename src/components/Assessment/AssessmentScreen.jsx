import { useState, useEffect } from 'react'
import questions_18_24 from '../../data/questions_18_24.json'
import questions_25_34 from '../../data/questions_25_34.json'
import questions_35_44 from '../../data/questions_35_44.json'
import questions_45_plus from '../../data/questions_45_plus.json'
import './Assessment.css'

const QUESTION_BANKS = {
  '18-24': questions_18_24,
  '25-34': questions_25_34,
  '35-44': questions_35_44,
  '45+': questions_45_plus,
}

const LIKERT_OPTIONS = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
]

// Create a pseudo-random but deterministic shuffle based on respondent ID
function seededShuffle(array, seed) {
  const shuffled = [...array]
  let random = seed
  for (let i = shuffled.length - 1; i > 0; i--) {
    random = (random * 9301 + 49297) % 233280
    const j = Math.floor((random / 233280) * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Simple hash of respondent ID to seed
function hashSeed(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

export default function AssessmentScreen({ respondentId, ageRange, onComplete }) {
  const storageKey = `aligniq-${respondentId}`
  const sequenceKey = `aligniq-sequence-${respondentId}`
  const responsesKey = `aligniq-responses-${respondentId}`

  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState({})
  const [randomizedQuestions, setRandomizedQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  // Initialize questions and restore saved state
  useEffect(() => {
    const questionBank = QUESTION_BANKS[ageRange]
    if (!questionBank) {
      console.error(`No question bank for age range: ${ageRange}`)
      return
    }

    // Try to restore saved state
    const savedResponses = localStorage.getItem(responsesKey)
    const savedSequence = localStorage.getItem(sequenceKey)
    const savedIndex = localStorage.getItem(storageKey)

    if (savedSequence && savedResponses) {
      // Restore existing assessment
      const seq = JSON.parse(savedSequence)
      const resp = JSON.parse(savedResponses)
      setRandomizedQuestions(seq)
      setResponses(resp)
      setCurrentIndex(savedIndex ? parseInt(savedIndex) : 0)
    } else {
      // Create new randomized sequence
      const seed = hashSeed(respondentId)
      const shuffled = seededShuffle(questionBank.questions, seed)
      setRandomizedQuestions(shuffled)
      localStorage.setItem(sequenceKey, JSON.stringify(shuffled))
    }

    setLoading(false)
  }, [respondentId, ageRange, storageKey, sequenceKey, responsesKey])

  const handleResponse = (value) => {
    const currentQuestion = randomizedQuestions[currentIndex]
    const newResponses = {
      ...responses,
      [currentQuestion.id]: value,
    }
    setResponses(newResponses)
    localStorage.setItem(responsesKey, JSON.stringify(newResponses))
    localStorage.setItem(storageKey, currentIndex)

    // Auto-advance to next question
    if (currentIndex < randomizedQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Assessment complete
      if (onComplete) {
        onComplete(newResponses)
      }
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      localStorage.setItem(storageKey, currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < randomizedQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      localStorage.setItem(storageKey, currentIndex + 1)
    }
  }

  if (loading) {
    return <div className="assessment-loading">Loading assessment...</div>
  }

  if (!randomizedQuestions.length) {
    return <div className="assessment-error">Unable to load assessment</div>
  }

  const currentQuestion = randomizedQuestions[currentIndex]
  const progress = ((currentIndex + 1) / randomizedQuestions.length) * 100
  const isLastQuestion = currentIndex === randomizedQuestions.length - 1

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <div className="wordmark">Sonari</div>
        <div className="assessment-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-label">
            Question {currentIndex + 1} of {randomizedQuestions.length}
          </div>
        </div>
      </div>

      <div className="assessment-content">
        <div className="question-container">
          <div className="question-text">{currentQuestion.text}</div>

          <div className="question-answers">
            {currentQuestion.type === 'likert' ? (
              <div className="likert-scale">
                {LIKERT_OPTIONS.map(option => (
                  <label key={option.value} className="likert-option">
                    <input
                      type="radio"
                      name={`q-${currentQuestion.id}`}
                      value={option.value}
                      checked={responses[currentQuestion.id] === option.value}
                      onChange={() => handleResponse(option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="scenario-options">
                {currentQuestion.options.map(opt => (
                  <label key={opt.value} className="scenario-option">
                    <input
                      type="radio"
                      name={`q-${currentQuestion.id}`}
                      value={opt.value}
                      checked={responses[currentQuestion.id] === opt.value}
                      onChange={() => handleResponse(opt.value)}
                    />
                    <span className="option-letter">{opt.value.toUpperCase()}.</span>
                    <span className="option-text">{opt.text}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation for manual stepping (optional) */}
        <div className="assessment-nav">
          <button
            className="btn btn-outline"
            onClick={handleBack}
            disabled={currentIndex === 0}
          >
            Back
          </button>

          {!isLastQuestion && (
            <button
              className="btn btn-outline"
              onClick={handleNext}
              disabled={responses[currentQuestion.id] === undefined}
            >
              Next
            </button>
          )}

          {isLastQuestion && responses[currentQuestion.id] !== undefined && (
            <button className="btn btn-gold" onClick={() => handleResponse(responses[currentQuestion.id])}>
              Finish Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
