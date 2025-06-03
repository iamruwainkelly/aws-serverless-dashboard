<template>
  <div class="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 mb-4">
          <CloudIcon class="w-8 h-8 text-primary-orange" />
          <h1 class="text-4xl lg:text-5xl font-bold gradient-text">AWS Cost Calculator</h1>
        </div>
        <p class="text-light-text text-lg max-w-2xl mx-auto">
          Estimate your AWS infrastructure costs with our comprehensive calculator. 
          Plan your cloud budget effectively with real-time pricing data.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Calculator Form -->
        <div class="lg:col-span-2">
          <div class="glass-card p-8">
            <h2 class="text-2xl font-bold mb-6 gradient-text">Configuration</h2>
            
            <form @submit.prevent="calculateCosts" class="space-y-6">
              <!-- Region Selection -->
              <div>
                <label for="region" class="block text-sm font-semibold text-white mb-2">
                  AWS Region
                </label>
                <select v-model="formData.region" id="region" class="form-select">
                  <option value="us-east-1">US East (N. Virginia)</option>
                  <option value="us-west-1">US West (N. California)</option>
                  <option value="us-west-2">US West (Oregon)</option>
                  <option value="eu-west-1">Europe (Ireland)</option>
                  <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                </select>
              </div>

              <!-- EC2 Configuration -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="ec2Type" class="block text-sm font-semibold text-white mb-2">
                    EC2 Instance Type
                  </label>
                  <select v-model="formData.ec2Type" id="ec2Type" class="form-select">
                    <option value="t3.micro">t3.micro (1 vCPU, 1 GB RAM)</option>
                    <option value="t3.small">t3.small (2 vCPU, 2 GB RAM)</option>
                    <option value="t3.medium">t3.medium (2 vCPU, 4 GB RAM)</option>
                    <option value="t3.large">t3.large (2 vCPU, 8 GB RAM)</option>
                    <option value="m5.large">m5.large (2 vCPU, 8 GB RAM)</option>
                    <option value="m5.xlarge">m5.xlarge (4 vCPU, 16 GB RAM)</option>
                    <option value="c5.large">c5.large (2 vCPU, 4 GB RAM)</option>
                  </select>
                </div>
                
                <div>
                  <label for="instances" class="block text-sm font-semibold text-white mb-2">
                    Number of Instances
                  </label>
                  <input v-model.number="formData.instances" type="number" id="instances" 
                         min="1" max="100" class="form-input" />
                </div>
              </div>

              <!-- Storage Configuration -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="storage" class="block text-sm font-semibold text-white mb-2">
                    EBS Storage (GB)
                  </label>
                  <input v-model.number="formData.storage" type="number" id="storage" 
                         min="20" max="10000" class="form-input" />
                </div>
                
                <div>
                  <label for="storageType" class="block text-sm font-semibold text-white mb-2">
                    Storage Type
                  </label>
                  <select v-model="formData.storageType" id="storageType" class="form-select">
                    <option value="gp3">General Purpose SSD (gp3)</option>
                    <option value="gp2">General Purpose SSD (gp2)</option>
                    <option value="io2">Provisioned IOPS SSD (io2)</option>
                    <option value="st1">Throughput Optimized HDD (st1)</option>
                  </select>
                </div>
              </div>

              <!-- Database Configuration -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="rdsType" class="block text-sm font-semibold text-white mb-2">
                    RDS Instance Type
                  </label>
                  <select v-model="formData.rdsType" id="rdsType" class="form-select">
                    <option value="">No Database</option>
                    <option value="db.t3.micro">db.t3.micro (1 vCPU, 1 GB RAM)</option>
                    <option value="db.t3.small">db.t3.small (2 vCPU, 2 GB RAM)</option>
                    <option value="db.t3.medium">db.t3.medium (2 vCPU, 4 GB RAM)</option>
                    <option value="db.r5.large">db.r5.large (2 vCPU, 16 GB RAM)</option>
                  </select>
                </div>
                
                <div>
                  <label for="rdsStorage" class="block text-sm font-semibold text-white mb-2">
                    RDS Storage (GB)
                  </label>
                  <input v-model.number="formData.rdsStorage" type="number" id="rdsStorage" 
                         min="20" max="1000" class="form-input" :disabled="!formData.rdsType" />
                </div>
              </div>

              <!-- Network Configuration -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="dataTransfer" class="block text-sm font-semibold text-white mb-2">
                    Data Transfer Out (GB/month)
                  </label>
                  <input v-model.number="formData.dataTransfer" type="number" id="dataTransfer" 
                         min="0" max="10000" class="form-input" />
                </div>
                
                <div>
                  <label for="loadBalancer" class="block text-sm font-semibold text-white mb-2">
                    Load Balancer
                  </label>
                  <select v-model="formData.loadBalancer" id="loadBalancer" class="form-select">
                    <option value="">No Load Balancer</option>
                    <option value="alb">Application Load Balancer</option>
                    <option value="nlb">Network Load Balancer</option>
                  </select>
                </div>
              </div>

              <!-- Additional Services -->
              <div>
                <label class="block text-sm font-semibold text-white mb-4">Additional Services</label>
                <div class="grid md:grid-cols-2 gap-4">
                  <label class="flex items-center gap-3">
                    <input v-model="formData.cloudfront" type="checkbox" 
                           class="w-4 h-4 text-primary-orange bg-dark-surface border-dark-border rounded focus:ring-primary-orange" />
                    <span class="text-light-text">CloudFront CDN</span>
                  </label>
                  <label class="flex items-center gap-3">
                    <input v-model="formData.s3" type="checkbox" 
                           class="w-4 h-4 text-primary-orange bg-dark-surface border-dark-border rounded focus:ring-primary-orange" />
                    <span class="text-light-text">S3 Storage (100GB)</span>
                  </label>
                  <label class="flex items-center gap-3">
                    <input v-model="formData.route53" type="checkbox" 
                           class="w-4 h-4 text-primary-orange bg-dark-surface border-dark-border rounded focus:ring-primary-orange" />
                    <span class="text-light-text">Route 53 DNS</span>
                  </label>
                  <label class="flex items-center gap-3">
                    <input v-model="formData.waf" type="checkbox" 
                           class="w-4 h-4 text-primary-orange bg-dark-surface border-dark-border rounded focus:ring-primary-orange" />
                    <span class="text-light-text">AWS WAF</span>
                  </label>
                </div>
              </div>

              <button type="submit" class="btn-primary w-full">
                <CalculatorIcon class="w-5 h-5 mr-2" />
                Calculate Monthly Costs
              </button>
            </form>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="space-y-6">
          <!-- Cost Breakdown -->
          <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 gradient-text">Cost Breakdown</h3>
            <div v-if="costs" class="space-y-4">
              <div class="flex justify-between items-center py-2 border-b border-dark-border">
                <span class="text-light-text">EC2 Instances</span>
                <span class="font-semibold">${{ costs.ec2 }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-dark-border">
                <span class="text-light-text">EBS Storage</span>
                <span class="font-semibold">${{ costs.storage }}</span>
              </div>
              <div v-if="costs.rds > 0" class="flex justify-between items-center py-2 border-b border-dark-border">
                <span class="text-light-text">RDS Database</span>
                <span class="font-semibold">${{ costs.rds }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-dark-border">
                <span class="text-light-text">Data Transfer</span>
                <span class="font-semibold">${{ costs.dataTransfer }}</span>
              </div>
              <div v-if="costs.loadBalancer > 0" class="flex justify-between items-center py-2 border-b border-dark-border">
                <span class="text-light-text">Load Balancer</span>
                <span class="font-semibold">${{ costs.loadBalancer }}</span>
              </div>
              <div v-if="costs.additional > 0" class="flex justify-between items-center py-2 border-b border-dark-border">
                <span class="text-light-text">Additional Services</span>
                <span class="font-semibold">${{ costs.additional }}</span>
              </div>
              <div class="flex justify-between items-center py-3 bg-gradient-to-r from-primary-orange/20 to-primary-purple/20 rounded-lg px-4">
                <span class="text-white font-semibold">Total Monthly Cost</span>
                <span class="text-2xl font-bold gradient-text">${{ costs.total }}</span>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <CalculatorIcon class="w-12 h-12 mx-auto mb-3 text-light-text" />
              <p class="text-light-text">Configure your AWS setup and calculate costs</p>
            </div>
          </div>

          <!-- Savings Tips -->
          <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 gradient-text">Cost Optimization Tips</h3>
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <LightBulbIcon class="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 class="font-semibold text-white text-sm">Reserved Instances</h4>
                  <p class="text-light-text text-xs">Save up to 75% with 1-3 year commitments</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <LightBulbIcon class="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 class="font-semibold text-white text-sm">Spot Instances</h4>
                  <p class="text-light-text text-xs">Use for non-critical workloads, save up to 90%</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <LightBulbIcon class="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 class="font-semibold text-white text-sm">Auto Scaling</h4>
                  <p class="text-light-text text-xs">Automatically adjust capacity based on demand</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="glass-card p-6">
            <h3 class="text-xl font-bold mb-4 gradient-text">Quick Presets</h3>
            <div class="space-y-2">
              <button @click="applyPreset('startup')" class="w-full text-left p-3 bg-dark-surface hover:bg-dark-border rounded-lg transition-colors">
                <h4 class="font-semibold text-white text-sm">Startup Setup</h4>
                <p class="text-light-text text-xs">Basic setup for small applications</p>
              </button>
              <button @click="applyPreset('production')" class="w-full text-left p-3 bg-dark-surface hover:bg-dark-border rounded-lg transition-colors">
                <h4 class="font-semibold text-white text-sm">Production Setup</h4>
                <p class="text-light-text text-xs">High availability production environment</p>
              </button>
              <button @click="applyPreset('enterprise')" class="w-full text-left p-3 bg-dark-surface hover:bg-dark-border rounded-lg transition-colors">
                <h4 class="font-semibold text-white text-sm">Enterprise Setup</h4>
                <p class="text-light-text text-xs">Large scale enterprise infrastructure</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { 
  CloudIcon, 
  CalculatorIcon, 
  LightBulbIcon 
} from '@heroicons/vue/24/outline'

const formData = reactive({
  region: 'us-east-1',
  ec2Type: 't3.micro',
  instances: 1,
  storage: 20,
  storageType: 'gp3',
  rdsType: '',
  rdsStorage: 20,
  dataTransfer: 100,
  loadBalancer: '',
  cloudfront: false,
  s3: false,
  route53: false,
  waf: false
})

const costs = ref(null)

// AWS Pricing (simplified)
const pricing = {
  ec2: {
    't3.micro': 0.0104,
    't3.small': 0.0208,
    't3.medium': 0.0416,
    't3.large': 0.0832,
    'm5.large': 0.096,
    'm5.xlarge': 0.192,
    'c5.large': 0.085
  },
  storage: {
    'gp3': 0.08,
    'gp2': 0.10,
    'io2': 0.125,
    'st1': 0.045
  },
  rds: {
    'db.t3.micro': 0.017,
    'db.t3.small': 0.034,
    'db.t3.medium': 0.068,
    'db.r5.large': 0.24
  },
  loadBalancer: {
    'alb': 22.5,
    'nlb': 22.5
  },
  dataTransfer: 0.09
}

const calculateCosts = () => {
  const hoursPerMonth = 730
  
  // EC2 costs
  const ec2Cost = (pricing.ec2[formData.ec2Type] || 0) * formData.instances * hoursPerMonth
  
  // Storage costs
  const storageCost = formData.storage * (pricing.storage[formData.storageType] || 0)
  
  // RDS costs
  const rdsCost = formData.rdsType ? 
    (pricing.rds[formData.rdsType] * hoursPerMonth) + (formData.rdsStorage * 0.115) : 0
  
  // Data transfer costs
  const dataTransferCost = Math.max(0, formData.dataTransfer - 100) * pricing.dataTransfer
  
  // Load balancer costs
  const loadBalancerCost = formData.loadBalancer ? pricing.loadBalancer[formData.loadBalancer] : 0
  
  // Additional services
  let additionalCost = 0
  if (formData.cloudfront) additionalCost += 1.0 // CloudFront basic
  if (formData.s3) additionalCost += 2.3 // 100GB S3 standard
  if (formData.route53) additionalCost += 0.5 // Hosted zone
  if (formData.waf) additionalCost += 5.0 // Basic WAF
  
  const total = ec2Cost + storageCost + rdsCost + dataTransferCost + loadBalancerCost + additionalCost
  
  costs.value = {
    ec2: ec2Cost.toFixed(2),
    storage: storageCost.toFixed(2),
    rds: rdsCost.toFixed(2),
    dataTransfer: dataTransferCost.toFixed(2),
    loadBalancer: loadBalancerCost.toFixed(2),
    additional: additionalCost.toFixed(2),
    total: total.toFixed(2)
  }
}

const applyPreset = (preset) => {
  switch (preset) {
    case 'startup':
      Object.assign(formData, {
        ec2Type: 't3.micro',
        instances: 1,
        storage: 20,
        storageType: 'gp3',
        rdsType: '',
        dataTransfer: 50,
        loadBalancer: '',
        cloudfront: false,
        s3: true,
        route53: true,
        waf: false
      })
      break
    case 'production':
      Object.assign(formData, {
        ec2Type: 't3.medium',
        instances: 2,
        storage: 100,
        storageType: 'gp3',
        rdsType: 'db.t3.small',
        rdsStorage: 100,
        dataTransfer: 500,
        loadBalancer: 'alb',
        cloudfront: true,
        s3: true,
        route53: true,
        waf: true
      })
      break
    case 'enterprise':
      Object.assign(formData, {
        ec2Type: 'm5.large',
        instances: 4,
        storage: 500,
        storageType: 'gp3',
        rdsType: 'db.r5.large',
        rdsStorage: 500,
        dataTransfer: 2000,
        loadBalancer: 'alb',
        cloudfront: true,
        s3: true,
        route53: true,
        waf: true
      })
      break
  }
  calculateCosts()
}
</script>
