/** 表示一个词元（token）及其概率 */
export interface Token {
  /** 词元的值 */
  value: string;
  /** 词元的概率，范围 [0, 1] */
  probability: number;
}

/** 表示一个序列及其得分 */
export interface Sequence {
  /** 序列中的词元数组 */
  tokens: Token[];
  /** 序列的累计得分（对数概率之和的负值） */
  score: number;
}

/** 表示解码过程中的一个步骤 */
export interface DecodingStep {
  /** 当前步骤中的候选序列 */
  currentSequences: Sequence[];
  /** 当前步骤的候选词元 */
  candidates: Token[];
  /** 步骤的时间戳 */
  timestamp: number;
}

/** 解码的最终结果 */
export interface DecodingResult {
  /** 解码过程中的所有步骤 */
  steps: DecodingStep[];
  /** 最终选择的序列 */
  finalSequence: Sequence;
} 