<template>
  <div class="control-panel">
    <div class="parameters">
      <h3>参数设置</h3>
      
      <div class="parameter-item">
        <label>束宽度</label>
        <el-slider
          v-model="beamWidth"
          :min="1"
          :max="10"
          :disabled="isPlaying"
        />
      </div>
      
      <div class="parameter-item">
        <label>最大序列长度</label>
        <el-slider
          v-model="maxLength"
          :min="5"
          :max="20"
          :disabled="isPlaying"
        />
      </div>
      
      <div class="parameter-item">
        <label>播放速度</label>
        <el-slider
          v-model="playbackSpeed"
          :min="0.5"
          :max="2"
          :step="0.5"
        />
      </div>
    </div>

    <div class="controls">
      <el-button-group>
        <el-button
          :disabled="isFirstStep"
          @click="previousStep"
          icon="el-icon-arrow-left"
        >
          上一步
        </el-button>
        
        <el-button
          v-if="!isPlaying"
          @click="play"
          type="primary"
          icon="el-icon-video-play"
        >
          播放
        </el-button>
        
        <el-button
          v-else
          @click="pause"
          type="primary"
          icon="el-icon-video-pause"
        >
          暂停
        </el-button>
        
        <el-button
          :disabled="isLastStep"
          @click="nextStep"
          icon="el-icon-arrow-right"
        >
          下一步
        </el-button>
      </el-button-group>

      <el-button
        @click="reset"
        icon="el-icon-refresh"
        :disabled="isPlaying"
      >
        重置
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useDecodingStore } from '../store'

export default defineComponent({
  name: 'ControlPanel',
  
  setup() {
    const store = useDecodingStore()

    const beamWidth = computed({
      get: () => store.beamWidth,
      set: (value) => store.setBeamWidth(value)
    })

    const maxLength = computed({
      get: () => store.maxSequenceLength,
      set: (value) => store.setMaxSequenceLength(value)
    })

    const playbackSpeed = computed({
      get: () => store.playbackSpeed,
      set: (value) => store.setPlaybackSpeed(value)
    })

    return {
      beamWidth,
      maxLength,
      playbackSpeed,
      isPlaying: computed(() => store.isPlaying),
      isFirstStep: computed(() => store.isFirstStep),
      isLastStep: computed(() => store.isLastStep),
      play: () => store.play(),
      pause: () => store.pause(),
      previousStep: () => store.previousStep(),
      nextStep: () => store.nextStep(),
      reset: () => store.reset()
    }
  }
})
</script> 