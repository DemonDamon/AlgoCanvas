<template>
    <div class="info-panel">
      <div class="current-step">
        <h4>当前步骤</h4>
        <div class="step-info">{{ currentStep + 1 }} / {{ totalSteps }}</div>
      </div>
  
      <div class="sequence-info">
        <h4>当前序列</h4>
        <div class="tokens">
          <span
            v-for="(token, index) in currentSequence"
            :key="index"
            class="token"
          >
            {{ token.value }}
          </span>
        </div>
      </div>
  
      <div class="score-info">
        <h4>累计得分</h4>
        <div class="score">{{ currentScore.toFixed(4) }}</div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useDecodingStore } from '../store'
  
  export default defineComponent({
    name: 'InfoPanel',
    
    setup() {
      const store = useDecodingStore()
  
      const currentStep = computed(() => store.currentStep)
      const totalSteps = computed(() => store.steps.length)
      
      const currentSequence = computed(() => {
        if (store.steps.length === 0) return []
        return store.steps[store.currentStep].currentSequences[0].tokens
      })
  
      const currentScore = computed(() => {
        if (store.steps.length === 0) return 0
        return store.steps[store.currentStep].currentSequences[0].score
      })
  
      return {
        currentStep,
        totalSteps,
        currentSequence,
        currentScore
      }
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .info-panel {
    padding: 20px;
    background: #f5f7fa;
    border-radius: 4px;
  
    h4 {
      margin: 0 0 8px 0;
      color: #606266;
    }
  
    > div {
      margin-bottom: 16px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  
    .tokens {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
  
      .token {
        padding: 4px 8px;
        background: #fff;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        font-size: 14px;
      }
    }
  
    .score {
      font-size: 16px;
      font-weight: bold;
      color: #409eff;
    }
  }
  </style>