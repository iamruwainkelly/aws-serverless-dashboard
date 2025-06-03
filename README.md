# 📊 AWS Serverless Dashboard

> **Real-time AWS serverless infrastructure monitoring dashboard with comprehensive metrics, cost optimization, and performance analytics**

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.x-FF6384?style=flat-square&logo=chart.js)](https://www.chartjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

🚀 **Live Demo**: [AWS Serverless Dashboard](https://aws-serverless-dashboard-ruwain.vercel.app)  
🎯 **Portfolio Integration**: [iamruwainkelly.vercel.app/aws-serverless](https://iamruwainkelly.vercel.app/aws-serverless)

## ✨ Features

### 🎯 **Core Functionality**
- **Real-time Metrics** - Live monitoring of Lambda, API Gateway, and other serverless services
- **Cost Analytics** - Comprehensive cost breakdowns with trend analysis
- **Performance Monitoring** - Duration, error rates, and invocation metrics
- **Service Health** - Status cards for Lambda, API Gateway, DynamoDB, S3, and Cognito

### 📈 **Interactive Charts**
- **Lambda Metrics** - Invocations, errors, duration, and error rate analysis
- **API Gateway Analytics** - Request status codes, latency statistics
- **Cost Visualization** - Pie charts and trend lines for cost optimization
- **Storage Metrics** - S3, SNS, and SQS usage monitoring

### 🔍 **CloudWatch Integration**
- **Live Log Streaming** - Real-time CloudWatch logs with filtering
- **Auto-refresh** - Configurable refresh intervals
- **Log Statistics** - Error counts and log level distribution
- **Search & Filter** - Advanced log filtering capabilities

### 💡 **Smart Features**
- **Real-time Data Simulation** - Mock AWS metrics with realistic patterns
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI** - Dark theme with glass morphism effects
- **Interactive Filters** - Region selector and time range controls

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/iamruwainkelly/aws-serverless-dashboard.git
cd aws-serverless-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The dashboard will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 🌐 Live Demo

Try the live deployed version here:
**[AWS Serverless Dashboard Demo](https://ruwainkelly.co.za/serverless-dashboard)**

## 🎮 Usage

### Dashboard Navigation

1. **Service Health Cards** - Monitor Lambda, API Gateway, DynamoDB, S3, and Cognito status
2. **Lambda Metrics** - View invocations, errors, duration, and error rates
3. **API Gateway Analytics** - Analyze request patterns and response times
4. **Cost Analysis** - Track spending across services with trend indicators
5. **CloudWatch Logs** - Monitor real-time logs with filtering capabilities
6. **Storage Metrics** - Track S3, SNS, and SQS usage

### Interactive Features

- **Region Selector** - Switch between AWS regions
- **Time Range Filters** - View metrics for different time periods
- **Auto-refresh** - Configure automatic data updates
- **Chart Interactions** - Hover for detailed metrics

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Vue 3 (Composition API)
- **Charts**: Chart.js with reactive data binding
- **Styling**: Tailwind CSS with dark theme
- **Build Tool**: Vite
- **Routing**: Vue Router
- **Deployment**: Static hosting compatible

### Project Structure
```
aws-serverless-dashboard/
├── src/
│   ├── api/
│   │   └── mock-metrics.js       # Mock AWS metrics generator
│   ├── components/
│   │   ├── charts/
│   │   │   ├── LambdaChart.vue
│   │   │   ├── ApiGatewayChart.vue
│   │   │   ├── CostPieChart.vue
│   │   │   ├── CostTrendChart.vue
│   │   │   └── StorageMetrics.vue
│   │   ├── StatusCard.vue
│   │   └── CloudWatchLogs.vue
│   ├── views/
│   │   └── ServerlessDashboard.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── vercel.json
└── README.md
```

## 📊 Dashboard Components

### Status Cards
- **Real-time Health Monitoring** - Service availability indicators
- **Animated Status Dots** - Visual health status representation
- **Service Metrics** - Quick overview of key performance indicators

### Chart Components
- **Lambda Chart** - Line charts for invocations, errors, and duration
- **API Gateway Chart** - Stacked bar charts for request analysis
- **Cost Charts** - Pie chart for breakdown, line chart for trends
- **Storage Metrics** - Card-based display for S3, SNS, SQS

### CloudWatch Logs
- **Live Log Streaming** - Real-time log display with color coding
- **Advanced Filtering** - Search by log level, service, or keywords
- **Auto-refresh Toggle** - Configurable update intervals
- **Log Statistics** - Error counts and distribution analysis

## 🎨 Customization

### Adding New Metrics
To add new AWS service metrics:

1. Update the `mock-metrics.js` API generator
2. Create new chart components in `src/components/charts/`
3. Add chart integration to `ServerlessDashboard.vue`
4. Update filters and time range logic

### Styling
The project uses a custom Tailwind configuration with:
- **Dark Theme** - Professional dark color scheme
- **Orange Accent** - Consistent branding colors
- **Glass Morphism** - Modern translucent card effects
- **Responsive Design** - Mobile-first approach

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
```

### Other Static Hosts
The build output in `dist/` can be deployed to any static hosting service.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**RUWΔIN KΞLLY**
- Website: [ruwainkelly.co.za](https://ruwainkelly.co.za)
- Email: admin@ruwainkelly.co.za
- GitHub: [@iamruwainkelly](https://github.com/iamruwainkelly)
- LinkedIn: [mr-r](https://linkedin.com/in/mr-r)

## 🙏 Acknowledgments

- AWS for comprehensive service documentation
- Vue.js team for the excellent framework
- Chart.js for powerful charting capabilities
- Tailwind CSS for the utility-first approach

---

⭐ **Star this repository if you find it helpful!**

## 📈 Planned Enhancements

- **Real AWS Integration** - Connect to actual CloudWatch APIs
- **Custom Dashboards** - User-configurable dashboard layouts
- **Alerting System** - Threshold-based notifications
- **Export Functionality** - PDF/CSV report generation
- **Multi-Region Support** - Cross-region metrics comparison

## ✅ Project Status

**🎉 COMPLETED & FULLY FUNCTIONAL**

### ✅ **Development Status**
- ✅ **Frontend Dashboard** - Complete Vue 3 + Composition API implementation
- ✅ **Chart Components** - All interactive charts with Chart.js integration
- ✅ **Mock Data API** - Realistic AWS metrics simulation
- ✅ **Responsive Design** - Mobile-friendly Tailwind CSS styling
- ✅ **Navigation Integration** - Seamless router configuration
- ✅ **Production Build** - Optimized build system with Vite

### ✅ **Deployment Ready**
- ✅ **Development Server** - Running on `http://localhost:3000`
- ✅ **Production Build** - Generates optimized static files
- ✅ **Standalone Repository** - Independent GitHub repo ready
- ✅ **Portfolio Integration** - Available at `/serverless-dashboard` route
- ✅ **Vercel Configuration** - Ready for instant deployment

### 🚀 **Live Demos**
- **Portfolio Integration**: [localhost:3002/serverless-dashboard](http://localhost:3002/serverless-dashboard)
- **Standalone Version**: [localhost:3000](http://localhost:3000)
- **Production Preview**: [localhost:4173](http://localhost:4173)

---

⭐ **Star this repository if you find it helpful!**