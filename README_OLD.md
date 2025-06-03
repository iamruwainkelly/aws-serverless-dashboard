# 📊 AWS Serverless Dashboard

> **Real-time AWS serverless infrastructure monitoring dashboard with comprehensive metrics, cost optimization, and performance analytics**

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.x-FF6384?style=flat-square&logo=chart.js)](https://www.chartjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

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

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/iamruwainkelly/aws-cost-calculator.git
cd aws-cost-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

The calculator will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 🎮 Usage

### Basic Cost Calculation

1. **Select AWS Region** - Choose your target deployment region
2. **Configure EC2** - Select instance type and quantity
3. **Add Storage** - Configure EBS storage type and size
4. **Database Setup** - Optionally add RDS database
5. **Network Options** - Configure data transfer and load balancing
6. **Additional Services** - Enable CloudFront, S3, Route 53, or WAF
7. **Calculate** - Get instant cost breakdown

### Quick Presets

- **Startup Setup** - Basic configuration for small applications
- **Production Setup** - High availability environment with redundancy
- **Enterprise Setup** - Large-scale infrastructure with all services

### Cost Optimization Tips

The calculator provides built-in recommendations:
- **Reserved Instances** - Save up to 75% with 1-3 year commitments
- **Spot Instances** - Use for non-critical workloads, save up to 90%
- **Auto Scaling** - Automatically adjust capacity based on demand

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Vue 3 (Composition API)
- **Styling**: Tailwind CSS with custom utilities
- **Build Tool**: Vite
- **Icons**: Heroicons
- **Deployment**: Static hosting compatible

### Project Structure
```
aws-cost-calculator/
├── src/
│   ├── components/
│   │   └── AWSCalculator.vue     # Main calculator component
│   ├── App.vue                   # Root component
│   ├── main.js                   # Application entry point
│   └── style.css                 # Global styles & Tailwind imports
├── public/                       # Static assets
├── tailwind.config.js            # Tailwind configuration
├── vite.config.js               # Vite configuration
└── package.json                  # Dependencies and scripts
```
├── vite.config.js               # Vite configuration
└── package.json                  # Dependencies and scripts
```

## 💰 Pricing Data

The calculator uses simplified AWS pricing models based on:
- **EC2 On-Demand** pricing for US East (N. Virginia)
- **EBS Storage** pricing per GB/month
- **RDS Instance** and storage pricing
- **Data Transfer** costs beyond free tier
- **Load Balancer** hourly and LCU pricing

> **Note**: Pricing is simplified for demonstration. For production use, integrate with AWS Pricing API for real-time rates.

## 🎨 Customization

### Styling
The project uses a custom Tailwind configuration with:
- **Dark Theme** - Professional dark color scheme
- **Custom Colors** - Orange and purple gradient branding
- **Glass Morphism** - Modern translucent effects
- **Responsive Design** - Mobile-first approach

### Adding New Services
To add new AWS services:

1. Update the `pricing` object in `AWSCalculator.vue`
2. Add form fields in the template
3. Update the `calculateCosts` function
4. Add preset configurations

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

- AWS for comprehensive pricing documentation
- Vue.js team for the excellent framework
- Tailwind CSS for the utility-first approach
- Heroicons for the beautiful icon set

---

⭐ **Star this repository if you find it helpful!**

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build


🌐 Live Demo

Try the live deployed version here:
https://ruwain-kelly-portfolio-v1.vercel.app/aws-calculator

⸻

📈 Planned Enhancements
	•	Integrate AWS Pricing API for live data
	•	Add currency selector (ZAR, EUR, USD)
	•	Export cost report to PDF/CSV
	•	User-authenticated budget tracking
	•	Embed into other portfolio tools (Terraform, Serverless Dashboards)










>>>>>>> 5e98fdcc7d32e65983f5a14ef430b14ae4893d4a
