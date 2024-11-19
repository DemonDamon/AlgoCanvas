<template>
  <div class="greedy-visualization" ref="container">
    <svg :width="width" :height="height">
      <g :transform="transform">
        <template v-for="(step, index) in steps" :key="index">
          <g :transform="`translate(${index * 120}, 0)`">
            <circle
              r="20"
              :class="{ active: index === currentStep }"
              @mouseenter="showTooltip(step)"
              @mouseleave="hideTooltip"
            />
            <text dy=".35em" text-anchor="middle">
              {{ step.currentSequences[0].tokens[index].value }}
            </text>
          </g>
          <line
            v-if="index < steps.length - 1"
            :x1="index * 120 + 20"
            :y1="0"
            :x2="(index + 1) * 120 - 20"
            :y2="0"
            stroke="#999"
          />
        </template>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useDecodingStore } from '../../store'

export default defineComponent({
  name: 'GreedySearchVisualization',
  setup() {
    const store = useDecodingStore()
    const container = ref<HTMLElement | null>(null)
    const width = ref(800)
    const height = ref(400)
    const transform = ref('translate(50, 200)')

    return {
      container,
      width,
      height,
      transform,
      steps: store.steps,
      currentStep: store.currentStep
    }
  }
})
</script>

<style lang="scss" scoped>
.greedy-visualization {
  width: 100%;
  height: 100%;
  
  circle {
    fill: #fff;
    stroke: #666;
    stroke-width: 2px;
    
    &.active {
      fill: #e6f7ff;
      stroke: #1890ff;
    }
  }
}
</style> 