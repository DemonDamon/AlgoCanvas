import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { DecodingStep, DecodingResult } from '../algorithms/types'
import { greedySearch } from '../algorithms/greedy-search'
import { beamSearch } from '../algorithms/beam-search'

export const useDecodingStore = defineStore('decoding', () => {
  const steps = ref<DecodingStep[]>([])
  const currentStep = ref(0)
  const isPlaying = ref(false)

  // 添加测试数据方法
  function addTestData() {
    console.log('添加测试数据')
    steps.value = [
      {
        currentSequences: [
          {
            tokens: [{ value: 'START', probability: 1 }],
            score: 0
          }
        ],
        candidates: [],
        timestamp: Date.now()
      }
    ]
    console.log('测试数据已添加:', steps.value)
  }

  // 修改 executeAlgorithm
  async function executeAlgorithm() {
    console.log('开始执行算法')
    addTestData() // 临时使用测试数据
  }

  return {
    steps,
    currentStep,
    isPlaying,
    executeAlgorithm,
    addTestData // 导出测试方法
  }
})