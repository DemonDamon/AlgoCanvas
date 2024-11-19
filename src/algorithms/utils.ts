import { Token } from './types'

/** 计算序列的累计对数概率得分 */
export function calculateSequenceScore(tokens: Token[]): number {
  return tokens.reduce((sum, token) => sum - Math.log(token.probability), 0)
}

/** 验证概率值是否有效 */
export function validateProbability(probability: number): boolean {
  return probability >= 0 && probability <= 1
} 