import { useState } from 'react'
import AssessmentScreen from './AssessmentScreen'
import AssessmentResults from './AssessmentResults'
import './Assessment.css'

/**
 * Main Assessment component that manages the flow:
 * 1. Display assessment questions
 * 2. Collect responses
 * 3. Calculate and display results
 */
export default function Assessment({ respondentId, ageRange, onAssessmentComplete, onSkip }) {
  const [stage, setStage] = useState('assessment') // 'assessment' or 'results'
  const [responses, setResponses] = useState(null)

  const handleAssessmentComplete = (finalResponses) => {
    setResponses(finalResponses)
    setStage('results')
  }

  const handleResultsContinue = () => {
    if (onAssessmentComplete) {
      onAssessmentComplete(responses)
    }
  }

  if (stage === 'assessment') {
    return (
      <AssessmentScreen
        respondentId={respondentId}
        ageRange={ageRange}
        onComplete={handleAssessmentComplete}
      />
    )
  }

  if (stage === 'results') {
    return (
      <AssessmentResults
        responses={responses}
        onContinue={handleResultsContinue}
      />
    )
  }

  return null
}
