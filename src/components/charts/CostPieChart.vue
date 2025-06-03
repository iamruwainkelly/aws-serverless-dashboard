<template>
  <div>
    <!-- Total Cost Summary -->
    <div class="text-center mb-6">
      <div class="text-3xl font-bold gradient-text">${{ totalCost }}</div>
      <div class="text-sm text-light-text">Monthly Cost</div>
    </div>

    <!-- Pie Chart -->
    <div class="h-64 flex justify-center">
      <Pie 
        :data="data" 
        :options="chartOptions"
        v-if="data?.labels?.length"
      />
    </div>

    <!-- Cost Breakdown List -->
    <div class="mt-6 space-y-2">
      <div v-for="(service, index) in data.labels" :key="service" 
           class="flex justify-between items-center p-2 bg-dark-surface rounded">
        <div class="flex items-center gap-2">
          <div 
            class="w-3 h-3 rounded-full" 
            :style="{ backgroundColor: data.datasets[0].backgroundColor[index] }"
          ></div>
          <span class="text-sm text-white">{{ service }}</span>
        </div>
        <span class="text-sm font-mono text-primary-orange">
          ${{ data.datasets[0].data[index].toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const totalCost = computed(() => {
  if (!props.data?.datasets?.[0]?.data) return '0.00'
  return props.data.datasets[0].data.reduce((sum, val) => sum + val, 0).toFixed(2)
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
          const total = context.dataset.data.reduce((sum, val) => sum + val, 0)
          const percentage = ((context.parsed / total) * 100).toFixed(1)
          return `${context.label}: $${context.parsed.toFixed(2)} (${percentage}%)`
        }
      }
    }
  }
}
</script>
