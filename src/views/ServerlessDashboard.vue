<template>
  <div class="min-h-screen bg-dark-bg text-text-primary">
    <!-- Dashboard Header -->
    <div class="glass backdrop-blur-lg pt-20 pb-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 class="text-4xl lg:text-5xl font-bold gradient-text mb-4">
              AWS Serverless Dashboard
            </h1>
            <p class="text-light-text text-lg max-w-2xl">
              Real-time monitoring and cost optimization for serverless infrastructure
            </p>
          </div>
          
          <!-- Filters -->
          <div class="flex flex-col sm:flex-row gap-4">
            <select v-model="selectedRegion" 
                    class="bg-dark-surface border border-primary-orange/30 rounded-lg px-4 py-2 text-white">
              <option value="us-east-1">US East (N. Virginia)</option>
              <option value="us-west-2">US West (Oregon)</option>
              <option value="eu-west-1">Europe (Ireland)</option>
              <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
            </select>
            
            <select v-model="timeRange" 
                    class="bg-dark-surface border border-primary-orange/30 rounded-lg px-4 py-2 text-white">
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Health Status Cards -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatusCard 
          v-for="service in healthStatus" 
          :key="service.name"
          :service="service"
        />
      </div>

      <!-- Main Charts Row -->
      <div class="grid lg:grid-cols-2 gap-8 mb-8">
        <!-- Lambda Metrics -->
        <div class="glass-card p-6">
          <h3 class="text-2xl font-semibold mb-4 gradient-text">Lambda Performance</h3>
          <LambdaChart :data="lambdaData" :timeRange="timeRange" />
        </div>

        <!-- API Gateway Stats -->
        <div class="glass-card p-6">
          <h3 class="text-2xl font-semibold mb-4 gradient-text">API Gateway Traffic</h3>
          <ApiGatewayChart :data="apiGatewayData" :timeRange="timeRange" />
        </div>
      </div>

      <!-- Cost Analysis Row -->
      <div class="grid lg:grid-cols-3 gap-8 mb-8">
        <!-- Cost Breakdown Pie -->
        <div class="glass-card p-6">
          <h3 class="text-2xl font-semibold mb-4 gradient-text">Cost Breakdown</h3>
          <CostPieChart :data="costData" />
        </div>

        <!-- S3 & Storage Metrics -->
        <div class="glass-card p-6">
          <h3 class="text-2xl font-semibold mb-4 gradient-text">Storage & Messaging</h3>
          <StorageMetrics :data="storageData" />
        </div>

        <!-- Cost Trends -->
        <div class="glass-card p-6">
          <h3 class="text-2xl font-semibold mb-4 gradient-text">Cost Trends</h3>
          <CostTrendChart :data="costTrendData" :timeRange="timeRange" />
        </div>
      </div>

      <!-- CloudWatch Logs -->
      <div class="glass-card p-6">
        <h3 class="text-2xl font-semibold mb-4 gradient-text">CloudWatch Logs</h3>
        <CloudWatchLogs :logs="cloudWatchLogs" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import StatusCard from '@/components/StatusCard.vue'
import LambdaChart from '@/components/charts/LambdaChart.vue'
import ApiGatewayChart from '@/components/charts/ApiGatewayChart.vue'
import CostPieChart from '@/components/charts/CostPieChart.vue'
import StorageMetrics from '@/components/charts/StorageMetrics.vue'
import CostTrendChart from '@/components/charts/CostTrendChart.vue'
import CloudWatchLogs from '@/components/CloudWatchLogs.vue'
import { generateMockData } from '@/api/mock-metrics.js'

// Reactive state
const selectedRegion = ref('us-east-1')
const timeRange = ref('24h')

// Data refs
const healthStatus = ref([])
const lambdaData = ref({})
const apiGatewayData = ref({})
const costData = ref({})
const storageData = ref({})
const costTrendData = ref({})
const cloudWatchLogs = ref([])

// Initialize dashboard
onMounted(() => {
  loadDashboardData()
})

// Watch for filter changes
watch([selectedRegion, timeRange], () => {
  loadDashboardData()
})

// Load all dashboard data
async function loadDashboardData() {
  try {
    const mockData = await generateMockData(selectedRegion.value, timeRange.value)
    
    healthStatus.value = mockData.healthStatus
    lambdaData.value = mockData.lambda
    apiGatewayData.value = mockData.apiGateway
    costData.value = mockData.costs
    storageData.value = mockData.storage
    costTrendData.value = mockData.costTrends
    cloudWatchLogs.value = mockData.logs
    
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
}
</script>
