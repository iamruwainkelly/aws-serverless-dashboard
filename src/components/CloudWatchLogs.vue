<template>
  <div>
    <!-- Log Filters -->
    <div class="flex flex-wrap gap-3 mb-4">
      <select v-model="selectedLevel" 
              class="bg-dark-surface border border-primary-orange/30 rounded px-3 py-1 text-sm text-white">
        <option value="">All Levels</option>
        <option value="ERROR">Error</option>
        <option value="WARN">Warning</option>
        <option value="INFO">Info</option>
        <option value="DEBUG">Debug</option>
      </select>
      
      <select v-model="selectedSource" 
              class="bg-dark-surface border border-primary-orange/30 rounded px-3 py-1 text-sm text-white">
        <option value="">All Sources</option>
        <option value="lambda-api">Lambda API</option>
        <option value="lambda-processor">Lambda Processor</option>
        <option value="api-gateway">API Gateway</option>
        <option value="cognito-auth">Cognito Auth</option>
      </select>
      
      <button @click="autoRefresh = !autoRefresh" 
              class="px-3 py-1 text-sm rounded transition-colors"
              :class="autoRefresh ? 'bg-green-600 text-white' : 'bg-dark-surface text-light-text'">
        {{ autoRefresh ? '⏸ Pause' : '▶ Auto-refresh' }}
      </button>
    </div>

    <!-- Logs Container -->
    <div class="bg-dark-surface rounded-lg border border-primary-orange/20 h-96 overflow-hidden">
      <div class="h-full overflow-y-auto custom-scrollbar">
        <div v-if="filteredLogs.length === 0" 
             class="flex items-center justify-center h-full text-light-text">
          No logs match the current filters
        </div>
        
        <div v-for="log in filteredLogs" :key="log.id" 
             class="p-3 border-b border-gray-600 hover:bg-gray-700/50 transition-colors">
          <div class="flex items-start gap-3">
            <!-- Timestamp -->
            <div class="text-xs text-light-text font-mono whitespace-nowrap pt-1">
              {{ formatTimestamp(log.timestamp) }}
            </div>
            
            <!-- Level Badge -->
            <div :class="getLevelClass(log.level)" 
                 class="text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
              {{ log.level }}
            </div>
            
            <!-- Source -->
            <div class="text-xs text-primary-orange font-mono whitespace-nowrap pt-1">
              {{ log.source }}
            </div>
            
            <!-- Message -->
            <div class="text-sm text-white flex-1 min-w-0">
              <div class="break-words">{{ log.message }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Log Stats -->
    <div class="grid grid-cols-4 gap-4 mt-4">
      <div class="text-center">
        <div class="text-lg font-bold text-red-400">{{ logStats.error }}</div>
        <div class="text-xs text-light-text">Errors</div>
      </div>
      <div class="text-center">
        <div class="text-lg font-bold text-yellow-400">{{ logStats.warn }}</div>
        <div class="text-xs text-light-text">Warnings</div>
      </div>
      <div class="text-center">
        <div class="text-lg font-bold text-blue-400">{{ logStats.info }}</div>
        <div class="text-xs text-light-text">Info</div>
      </div>
      <div class="text-center">
        <div class="text-lg font-bold text-gray-400">{{ logStats.debug }}</div>
        <div class="text-xs text-light-text">Debug</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  logs: {
    type: Array,
    required: true
  }
})

const selectedLevel = ref('')
const selectedSource = ref('')
const autoRefresh = ref(true)
let refreshInterval = null

const filteredLogs = computed(() => {
  return props.logs.filter(log => {
    const levelMatch = !selectedLevel.value || log.level === selectedLevel.value
    const sourceMatch = !selectedSource.value || log.source === selectedSource.value
    return levelMatch && sourceMatch
  })
})

const logStats = computed(() => {
  const stats = { error: 0, warn: 0, info: 0, debug: 0 }
  props.logs.forEach(log => {
    switch (log.level) {
      case 'ERROR': stats.error++; break
      case 'WARN': stats.warn++; break
      case 'INFO': stats.info++; break
      case 'DEBUG': stats.debug++; break
    }
  })
  return stats
})

function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

function getLevelClass(level) {
  const classes = {
    'ERROR': 'bg-red-600 text-white',
    'WARN': 'bg-yellow-600 text-white',
    'INFO': 'bg-blue-600 text-white',
    'DEBUG': 'bg-gray-600 text-white'
  }
  return classes[level] || 'bg-gray-600 text-white'
}

// Auto-refresh simulation
onMounted(() => {
  if (autoRefresh.value) {
    refreshInterval = setInterval(() => {
      // In a real app, this would fetch new logs
      console.log('Auto-refreshing logs...')
    }, 5000)
  }
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})

watch(autoRefresh, (newValue) => {
  if (newValue) {
    refreshInterval = setInterval(() => {
      console.log('Auto-refreshing logs...')
    }, 5000)
  } else if (refreshInterval) {
    clearInterval(refreshInterval)
    refreshInterval = null
  }
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #f97316;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #ea580c;
}
</style>
