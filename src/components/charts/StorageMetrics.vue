<template>
  <div class="space-y-6">
    <!-- S3 Storage -->
    <div class="bg-dark-surface rounded-lg p-4">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xl">📦</span>
        <h4 class="font-semibold text-white">S3 Storage</h4>
      </div>
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div class="text-light-text">Total Storage</div>
          <div class="font-mono text-primary-orange">{{ data.s3?.totalStorage }}</div>
        </div>
        <div>
          <div class="text-light-text">Objects</div>
          <div class="font-mono text-white">{{ data.s3?.objectCount }}</div>
        </div>
        <div>
          <div class="text-light-text">Buckets</div>
          <div class="font-mono text-white">{{ data.s3?.buckets }}</div>
        </div>
        <div>
          <div class="text-light-text">Monthly Cost</div>
          <div class="font-mono text-green-400">{{ data.s3?.monthlyCost }}</div>
        </div>
      </div>
    </div>

    <!-- SNS Messaging -->
    <div class="bg-dark-surface rounded-lg p-4">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xl">📢</span>
        <h4 class="font-semibold text-white">SNS</h4>
      </div>
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div class="text-light-text">Topics</div>
          <div class="font-mono text-white">{{ data.sns?.topics }}</div>
        </div>
        <div>
          <div class="text-light-text">Subscriptions</div>
          <div class="font-mono text-white">{{ data.sns?.subscriptions }}</div>
        </div>
        <div>
          <div class="text-light-text">Messages</div>
          <div class="font-mono text-primary-orange">{{ data.sns?.messagesPublished }}</div>
        </div>
        <div>
          <div class="text-light-text">Cost</div>
          <div class="font-mono text-green-400">{{ data.sns?.monthlyCost }}</div>
        </div>
      </div>
    </div>

    <!-- SQS Queues -->
    <div class="bg-dark-surface rounded-lg p-4">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xl">🔄</span>
        <h4 class="font-semibold text-white">SQS</h4>
      </div>
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div class="text-light-text">Queues</div>
          <div class="font-mono text-white">{{ data.sqs?.queues }}</div>
        </div>
        <div>
          <div class="text-light-text">Processed</div>
          <div class="font-mono text-primary-orange">{{ data.sqs?.messagesProcessed }}</div>
        </div>
        <div>
          <div class="text-light-text">DLQ Messages</div>
          <div class="font-mono text-yellow-400">{{ data.sqs?.dlqMessages }}</div>
        </div>
        <div>
          <div class="text-light-text">Cost</div>
          <div class="font-mono text-green-400">{{ data.sqs?.monthlyCost }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
