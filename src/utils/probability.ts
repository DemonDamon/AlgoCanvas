import { Token } from '../algorithms/types'
import { validateProbability } from '../algorithms/utils'

// 扩展词汇表并添加上下文相关的概率
const vocabularyWithContext: { [key: string]: { [key: string]: number } } = {
  '<START>': {
    '我': 0.5,
    '正在': 0.3,
    '是': 0.2
  },
  '我': {
    '是': 0.6,
    '正在': 0.4
  },
  '是': {
    '一个': 0.8,
    '正在': 0.2
  },
  '一个': {
    '程序员': 0.5,
    '学生': 0.5
  },
  '程序员': {
    '正在': 0.7,
    '<END>': 0.3
  },
  '学生': {
    '正在': 0.7,
    '<END>': 0.3
  },
  '正在': {
    '学习': 0.5,
    '编程': 0.5
  },
  '学习': {
    '<END>': 1.0
  },
  '编程': {
    '<END>': 1.0
  }
}

export function getProbabilities(currentTokens: Token[]): { value: string; probability: number }[] {
  // 使用类型定义
  const vocabulary: { [key: string]: string[] } = {
    '<START>': ['我', '你', '他'],
    '我': ['是', '在', '想'],
    '你': ['是', '在', '想'],
    '他': ['是', '在', '想'],
    '是': ['一个', '最', '很'],
    '在': ['学习', '工作', '思考'],
    '想': ['要', '成为', '知道'],
    '一个': ['程序员', '学生', '老师'],
    '程序员': ['正在', '想要', '喜欢'],
    '学生': ['正在', '想要', '喜欢'],
    '老师': ['正在', '想要', '喜欢'],
    '正在': ['学习', '工作', '编程'],
    '学习': ['编程', '数学', '<END>'],
    '工作': ['努力', '加班', '<END>'],
    '编程': ['很有趣', '<END>'],
    '很有趣': ['<END>'],
    '努力': ['<END>'],
    '加班': ['<END>'],
    '想要': ['学习', '工作'],
    '喜欢': ['编程', '阅读'],
    '要': ['学习', '工作'],
    '成为': ['一个', '优秀的'],
    '知道': ['答案', '<END>'],
    '答案': ['<END>'],
    '优秀的': ['程序员', '学生'],
  }

  const lastToken = currentTokens[currentTokens.length - 1].value as keyof typeof vocabulary
  let nextPossibleTokens = vocabulary[lastToken]

  // 如果没有定义后续词元，提供一个默认的候选列表
  if (!nextPossibleTokens || nextPossibleTokens.length === 0) {
    nextPossibleTokens = ['<END>']
  }

  console.log(`当前序列：${currentTokens.map(t => t.value).join(' ')}`)
  console.log(`最后一个词元：${lastToken}`)
  console.log(`可能的下一个词元：${nextPossibleTokens.join(', ')}`)

  return nextPossibleTokens.map(token => ({
    value: token,
    probability: Math.random() * 0.5 + 0.5 // 生成0.5-1之间的随机概率
  }))
}

// 用于测试的辅助函数
export function getVocabulary(): string[] {
  return Array.from(new Set(
    Object.keys(vocabularyWithContext)
      .concat(Object.values(vocabularyWithContext)
        .flatMap(obj => Object.keys(obj)))
  ))
} 