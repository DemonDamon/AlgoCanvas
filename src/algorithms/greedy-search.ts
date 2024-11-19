import { Token, Sequence, DecodingStep, DecodingResult } from './types'
import { getProbabilities } from '../utils/probability'

export function greedySearch(
  startToken: string,
  endToken: string,
  maxLength: number
): DecodingResult {
  let currentSequence: Sequence = {
    tokens: [{ value: startToken, probability: 1 }],
    score: 0
  }
  
  const steps: DecodingStep[] = []

  while (
    currentSequence.tokens.length < maxLength &&
    currentSequence.tokens[currentSequence.tokens.length - 1].value !== endToken
  ) {
    const candidates = getProbabilities(currentSequence.tokens)
    if (candidates.length === 0) break

    const bestToken = candidates.reduce((best, current) => 
      current.probability > best.probability ? current : best
    )

    const newTokens = [...currentSequence.tokens, bestToken]
    const newScore = newTokens.reduce((sum, t) => sum - Math.log(t.probability), 0)
    
    currentSequence = {
      tokens: newTokens,
      score: newScore
    }

    steps.push({
      currentSequences: [currentSequence],
      candidates,
      timestamp: Date.now()
    })
  }

  return {
    steps,
    finalSequence: currentSequence
  }
} 