<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      prop="step"
      label="步骤"
      width="80">
    </el-table-column>
    <el-table-column
      prop="sequence"
      label="序列">
    </el-table-column>
    <el-table-column
      prop="probability"
      label="概率值">
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useDecodingStore } from '../../store'

const store = useDecodingStore()

const tableData = computed(() => {
  return store.steps.map((step, index) => {
    const sequence = step.currentSequences[0]
    const tokens = sequence.tokens.map(t => t.value).join(' ')
    const probability = sequence.tokens.reduce((prod, t) => prod * t.probability, 1)
    return {
      step: index + 1,
      sequence: tokens,
      probability: probability.toFixed(4)
    }
  })
})
</script>

<style scoped>
</style>
