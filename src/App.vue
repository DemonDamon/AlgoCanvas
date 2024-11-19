<template>
  <div class="app">
    <div class="visualization">
      <beam-search-visualization v-if="algorithmType === 'beam'" />
      <greedy-search-visualization v-else />
    </div>
    <div class="control-container">
      <control-panel />
      <info-panel />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useDecodingStore } from './store'
import BeamSearchVisualization from './components/BeamSearch/BeamSearchVisualization.vue'
import BeamSearchTable from './components/BeamSearch/BeamSearchTable.vue'
import GreedySearchVisualization from './components/GreedySearch/GreedySearchVisualization.vue'
import ControlPanel from './components/ControlPanel.vue'
import InfoPanel from './components/InfoPanel.vue'

export default defineComponent({
  name: 'App',
  components: {
    BeamSearchVisualization,
    BeamSearchTable,
    GreedySearchVisualization,
    ControlPanel,
    InfoPanel
  },
  setup() {
    const store = useDecodingStore()
    return {
      algorithmType: computed(() => store.algorithmType)
    }
  }
})
</script>

<style lang="scss">
.app {
  padding: 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  height: 100vh;
  box-sizing: border-box;
}

.control-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.visualization {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
  border: 1px solid #eee;
}
</style> 