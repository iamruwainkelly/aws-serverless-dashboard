<template>
  <div class="glass-card p-4 hover:scale-105 transition-transform duration-300">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <span class="text-2xl">{{ service.icon }}</span>
        <h3 class="font-semibold text-white">{{ service.name }}</h3>
      </div>
      <div :class="statusClasses">
        <div class="w-2 h-2 rounded-full" :class="statusIndicator"></div>
      </div>
    </div>
    
    <div class="space-y-2">
      <div v-for="(value, key) in service.metrics" :key="key" 
           class="flex justify-between items-center text-sm">
        <span class="text-light-text capitalize">{{ formatMetricName(key) }}:</span>
        <span class="text-white font-mono">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

const statusClasses = computed(() => ({
  'flex items-center justify-center w-6 h-6 rounded-full': true,
  'bg-green-500/20': props.service.status === 'healthy',
  'bg-yellow-500/20': props.service.status === 'warning',
  'bg-red-500/20': props.service.status === 'error'
}))

const statusIndicator = computed(() => ({
  'bg-green-400 animate-pulse': props.service.status === 'healthy',
  'bg-yellow-400 animate-pulse': props.service.status === 'warning',
  'bg-red-400 animate-pulse': props.service.status === 'error'
}))

function formatMetricName(name) {
  return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}
</script>
