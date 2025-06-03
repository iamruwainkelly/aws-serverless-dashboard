<template>
  <div>
    <!-- Latency Stats -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="text-center p-3 bg-dark-surface rounded-lg">
        <div class="text-2xl font-bold text-green-400">{{ data.latencyStats?.average }}ms</div>
        <div class="text-xs text-light-text">Avg Latency</div>
      </div>
      <div class="text-center p-3 bg-dark-surface rounded-lg">
        <div class="text-2xl font-bold text-yellow-400">{{ data.latencyStats?.p95 }}ms</div>
        <div class="text-xs text-light-text">P95 Latency</div>
      </div>
      <div class="text-center p-3 bg-dark-surface rounded-lg">
        <div class="text-2xl font-bold text-red-400">{{ data.latencyStats?.p99 }}ms</div>
        <div class="text-xs text-light-text">P99 Latency</div>
      </div>
    </div>

    <!-- Requests by Endpoint Chart -->
    <div>
      <h4 class="text-sm font-medium text-light-text mb-3">Requests by Endpoint (Status Codes)</h4>
      <div class="h-64">
        <Bar 
          :data="data.requestsByEndpoint" 
          :options="chartOptions"
          v-if="data.requestsByEndpoint?.labels?.length"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#9CA3AF',
        usePointStyle: true,
        padding: 20
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#8b5cf6',
      borderWidth: 1,
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${formatNumber(context.parsed.y)} requests`
        }
      }
    }
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#9CA3AF',
        maxRotation: 45
      }
    },
    y: {
      stacked: true,
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
