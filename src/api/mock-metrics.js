// Mock AWS Serverless Dashboard Data Generator
export async function generateMockData(region, timeRange) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const now = new Date()
  const timeRanges = {
    '24h': 24,
    '7d': 7 * 24,
    '30d': 30 * 24
  }
  
  const hours = timeRanges[timeRange] || 24
  
  return {
    healthStatus: generateHealthStatus(),
    lambda: generateLambdaData(hours),
    apiGateway: generateApiGatewayData(hours),
    costs: generateCostData(),
    storage: generateStorageData(),
    costTrends: generateCostTrends(hours),
    logs: generateCloudWatchLogs()
  }
}

function generateHealthStatus() {
  return [
    {
      name: 'Lambda',
      status: 'healthy',
      icon: '⚡',
      metrics: { functions: 47, invocations: '2.3M', errors: '0.02%' }
    },
    {
      name: 'API Gateway',
      status: 'healthy',
      icon: '🌐',
      metrics: { endpoints: 12, requests: '890K', latency: '47ms' }
    },
    {
      name: 'DynamoDB',
      status: 'healthy',
      icon: '🗄️',
      metrics: { tables: 8, reads: '1.2M', writes: '340K' }
    },
    {
      name: 'S3',
      status: 'warning',
      icon: '📦',
      metrics: { buckets: 15, objects: '2.1M', storage: '847GB' }
    },
    {
      name: 'Cognito',
      status: 'healthy',
      icon: '👤',
      metrics: { users: '12.3K', pools: 3, sessions: '1.8K' }
    }
  ]
}

function generateLambdaData(hours) {
  const labels = Array.from({ length: Math.min(hours, 24) }, (_, i) => {
    const date = new Date()
    date.setHours(date.getHours() - (hours === 24 ? 23 - i : (hours - 1) * (23 / (hours - 1)) - i * (23 / (hours - 1))))
    return hours === 24 ? 
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
      date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  })
  
  return {
    invocations: {
      labels,
      datasets: [{
        label: 'Invocations',
        data: labels.map(() => Math.floor(Math.random() * 5000) + 1000),
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    errors: {
      labels,
      datasets: [{
        label: 'Errors',
        data: labels.map(() => Math.floor(Math.random() * 50) + 5),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    duration: {
      average: Math.floor(Math.random() * 200) + 100,
      p95: Math.floor(Math.random() * 500) + 300,
      p99: Math.floor(Math.random() * 1000) + 800
    }
  }
}

function generateApiGatewayData(hours) {
  const endpoints = [
    '/api/users', '/api/orders', '/api/products', '/api/auth', 
    '/api/analytics', '/api/payments', '/api/notifications'
  ]
  
  return {
    requestsByEndpoint: {
      labels: endpoints,
      datasets: [
        {
          label: '2xx Success',
          data: endpoints.map(() => Math.floor(Math.random() * 10000) + 5000),
          backgroundColor: '#10b981',
        },
        {
          label: '4xx Client Error',
          data: endpoints.map(() => Math.floor(Math.random() * 500) + 100),
          backgroundColor: '#f59e0b',
        },
        {
          label: '5xx Server Error',
          data: endpoints.map(() => Math.floor(Math.random() * 50) + 10),
          backgroundColor: '#ef4444',
        }
      ]
    },
    latencyStats: {
      average: Math.floor(Math.random() * 100) + 50,
      p95: Math.floor(Math.random() * 300) + 150,
      p99: Math.floor(Math.random() * 800) + 400
    }
  }
}

function generateCostData() {
  return {
    labels: ['Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudWatch', 'Cognito'],
    datasets: [{
      data: [1847.23, 324.67, 892.45, 156.78, 89.12, 67.34],
      backgroundColor: [
        '#f97316', // orange
        '#8b5cf6', // purple  
        '#06b6d4', // cyan
        '#10b981', // emerald
        '#f59e0b', // amber
        '#ef4444'  // red
      ],
      borderWidth: 0
    }]
  }
}

function generateStorageData() {
  return {
    s3: {
      totalStorage: '847.3 GB',
      objectCount: '2,134,567',
      buckets: 15,
      monthlyCost: '$156.78'
    },
    sns: {
      topics: 8,
      subscriptions: 47,
      messagesPublished: '1.2M',
      monthlyCost: '$23.45'
    },
    sqs: {
      queues: 12,
      messagesProcessed: '3.7M',
      dlqMessages: 234,
      monthlyCost: '$45.67'
    }
  }
}

function generateCostTrends(hours) {
  const labels = Array.from({ length: Math.min(hours / 24, 30) }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (30 - i))
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  })
  
  return {
    labels,
    datasets: [{
      label: 'Daily Cost ($)',
      data: labels.map((_, i) => {
        const baseValue = 120
        const trend = i * 2 // slight upward trend
        const noise = (Math.random() - 0.5) * 20
        return Math.max(0, baseValue + trend + noise)
      }),
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      tension: 0.4,
      fill: true
    }]
  }
}

function generateCloudWatchLogs() {
  const sources = ['lambda-api', 'lambda-processor', 'api-gateway', 'cognito-auth']
  const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG']
  const messages = [
    'Function execution completed successfully',
    'Processing batch of 150 records',
    'API request rate exceeded threshold',
    'Database connection pool exhausted',
    'User authentication successful',
    'Cache miss for user session',
    'Retry attempt 2 of 3 for failed request',
    'Memory usage: 85% of allocated',
    'Cold start detected for function',
    'Request processing time: 245ms'
  ]
  
  return Array.from({ length: 50 }, (_, i) => {
    const timestamp = new Date()
    timestamp.setMinutes(timestamp.getMinutes() - i * 2)
    
    return {
      id: i + 1,
      timestamp: timestamp.toISOString(),
      source: sources[Math.floor(Math.random() * sources.length)],
      level: levels[Math.floor(Math.random() * levels.length)],
      message: messages[Math.floor(Math.random() * messages.length)]
    }
  }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
}
