import { Token, Sequence, DecodingStep, DecodingResult } from './types'
import { getProbabilities } from '../utils/probability'

export function beamSearch(
  startToken: string,
  endToken: string,
  maxLength: number,
  beamWidth: number
): DecodingResult {
  console.log('Starting beam search with params:', { startToken, endToken, maxLength, beamWidth })
  
  let sequences: Sequence[] = [{
    tokens: [{ value: startToken, probability: 1 }],
    score: 0
  }]
  let steps: DecodingStep[] = []

  steps.push({
    currentSequences: sequences,
    candidates: [],
    timestamp: Date.now()
  })

  for (let i = 0; i < maxLength; i++) {
    console.log(`Processing step ${i}`)
    let allCandidates: Sequence[] = []

    for (const seq of sequences) {
      if (seq.tokens[seq.tokens.length - 1].value === endToken) {
        allCandidates.push(seq)
        continue
      }

      const candidates = getProbabilities(seq.tokens)
      
      for (const token of candidates) {
        const newTokens = [...seq.tokens, token]
        const newScore = newTokens.reduce((sum, t) => sum - Math.log(t.probability), 0)
        allCandidates.push({ tokens: newTokens, score: newScore })
      }
    }

    allCandidates.sort((a, b) => a.score - b.score)
    sequences = allCandidates.slice(0, beamWidth)

    steps.push({
      currentSequences: sequences,
      candidates: getProbabilities(sequences[0].tokens),
      timestamp: Date.now()
    })

    console.log(`Step ${i} sequences:`, sequences)
  }

  console.log('Beam search completed')
  return {
    steps,
    finalSequence: sequences[0]
  }
} 