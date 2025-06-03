<template>
  <div>
    <!-- Metrics Summary -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="text-center p-3 bg-dark-surface rounded-lg">
        <div class="text-2xl font-bold gradient-text">{{ formatNumber(totalInvocations) }}</div>
        <div class="text-xs text-light-text">Total Invocations</div>
      </div>
      <div class="text-center p-3 bg-dark-surface rounded-lg">
        <div class="text-2xl font-bold text-red-400">{{ data.duration?.average }}ms</div>
        <div class="text-xs text-light-text">Avg Duration</div>
      </div>
      <div class="text-center p-3 bg-dark-surface rounded-lg">
        <div class="text-2xl font-bold text-yellow-400">{{ errorRate }}%</div>
        <div class="text-xs text-light-text">Error Rate</div>
      </div>
    </div>

    <!-- Invocations Chart -->
    <div class="mb-4">
      <h4 class="text-sm font-medium text-light-text mb-3">Invocations Over Time</h4>
      <div class="h-48">
        <Line 
          :data="data.invocations" 
          :options="chartOptions"
          v-if="data.invocations?.labels?.length"
        />
      </div>
    </div>

    <!-- Error Overlay Chart -->
    <div>
      <h4 class="text-sm font-medium text-light-text mb-3">Error Trends</h4>
      <div class="h-32">
        <Line 
          :data="data.errors" 
          :options="errorChartOptions"
          v-if="data.errors?.labels?.length"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  timeRange: {
    type: String,
    default: '24h'
  }
})

const totalInvocations = computed(() => {
  if (!props.data.invocations?.datasets?.[0]?.data) return 0
  return props.data.invocations.datasets[0].data.reduce((sum, val) => sum + val, 0)
})

const errorRate = computed(() => {
  if (!props.data.errors?.datasets?.[0]?.data || !props.data.invocations?.datasets?.[0]?.data) return 0
  const totalErrors = props.data.errors.datasets[0].data.reduce((sum, val) => sum + val, 0)
  const totalInvokes = props.data.invocations.datasets[0].data.reduce((sum, val) => sum + val, 0)
  return totalInvokes > 0 ? ((totalErrors / totalInvokes) * 100).toFixed(2) : 0
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#f97316',
      borderWidth: 1
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#9CA3AF'
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#9CA3AF',
        callback: function(value) {
          return formatNumber(value)
        }
      }
    }
  },
  elements: {
    point: {
      radius: 3,
      hoverRadius: 6
    }
  }
}

const errorChartOptions = {
  ...chartOptions,
  scales: {
    ...chartOptions.scales,
    y: {
      ...chartOptions.scales.y,
      ticks: {
        ...chartOptions.scales.y.ticks,
        callback: function(value) {
          return value
        }
      }
    }
  }
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
</script>
