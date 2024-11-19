<template>
  <div class="beam-visualization" ref="container">
    <!-- 添加测试按钮和状态显示 -->
    <div class="debug-panel" style="padding: 10px;">
      <button @click="testRender">测试渲染</button>
      <div>
        Steps数量: {{ store.steps.length }}
        <br>
        当前步骤: {{ store.currentStep }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'
import { useDecodingStore } from '../../store'

const container = ref(null)
const store = useDecodingStore()

// 测试用的简单渲染函数
function testRender() {
  console.log('测试渲染被触发')
  console.log('当前store状态:', {
    stepsLength: store.steps.length,
    currentStep: store.currentStep
  })

  if (!container.value) {
    console.log('容器不存在')
    return
  }

  // 清空容器
  const svg = d3.select(container.value)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', 500)
    .attr('height', 300)

  // 绘制一个测试圆形
  svg.selectAll('circle')
    .data([{ x: 250, y: 150, r: 50 }])
    .join('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.r)
    .style('fill', 'blue')
}

onMounted(() => {
  console.log('组件已挂载')
  console.log('container:', container.value)
  testRender() // 测试初始渲染
})
</script>

<style lang="scss" scoped>
.beam-visualization {
  width: 100%;
  height: 400px;
  background: #fff;
  border: 2px solid red; // 添加明显的边框用于调试
  position: relative;
}
</style>