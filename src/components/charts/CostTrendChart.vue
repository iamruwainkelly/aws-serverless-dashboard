<template>
  <div>
    <!-- Cost Summary -->
    <div class="mb-4">
      <div class="text-center p-3 bg-dark-surface rounded-lg">
        <div class="text-2xl font-bold gradient-text">${{ averageDailyCost }}</div>
        <div class="text-xs text-light-text">Average Daily Cost</div>
      </div>
    </div>

    <!-- Trend Chart -->
    <div class="h-48">
      <Line 
        :data="data" 
        :options="chartOptions"
        v-if="data?.labels?.length"
      />
    </div>

    <!-- Trend Analysis -->
    <div class="mt-4 text-center">
      <div class="text-sm" :class="trendClass">
        <span class="font-semibold">{{ trendDirection }}</span>
        <span class="text-light-text ml-1">{{ trendDescription }}</span>
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

const averageDailyCost = computed(() => {
  if (!props.data?.datasets?.[0]?.data?.length) return '0.00'
  const total = props.data.datasets[0].data.reduce((sum, val) => sum + val, 0)
  return (total / props.data.datasets[0].data.length).toFixed(2)
})

const trendDirection = computed(() => {
  if (!props.data?.datasets?.[0]?.data?.length || props.data.datasets[0].data.length < 2) return 'Stable'
  
  const data = props.data.datasets[0].data
  const first = data[0]
  const last = data[data.length - 1]
  const percentChange = ((last - first) / first) * 100
  
  if (percentChange > 5) return '↗ Increasing'
  if (percentChange < -5) return '↘ Decreasing'
  return '→ Stable'
})

const trendClass = computed(() => ({
  'text-red-400': trendDirection.value.includes('Increasing'),
  'text-green-400': trendDirection.value.includes('Decreasing'),
  'text-yellow-400': trendDirection.value.includes('Stable')
}))

const trendDescription = computed(() => {
  if (trendDirection.value.includes('Increasing')) return 'costs over time period'
  if (trendDirection.value.includes('Decreasing')) return 'cost optimization'
  return 'cost pattern'
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
      borderColor: '#8b5cf6',
      borderWidth: 1,
      callbacks: {
        label: function(context) {
          return `Cost: $${context.parsed.y.toFixed(2)}`
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#9CA3AF',
        maxRotation: 45
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#9CA3AF',
        callback: function(value) {
          return '$' + value.toFixed(0)
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
</script>
