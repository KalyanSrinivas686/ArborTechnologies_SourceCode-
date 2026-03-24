# Arbor Technologies Website - Complete Source Code

A modern business website built with Angular (frontend) and Node.js/Express (backend).

## 📁 Project Structure

```
kal4-website/
├── backend/              # Node.js/Express backend
│   ├── server.js        # Main server file
│   ├── package.json     # Backend dependencies
│   └── .env             # Environment variables
├── src/                 # Angular frontend source
│   ├── app/            # Application components
│   │   ├── components/ # All UI components
│   │   └── services/   # API services
│   └── styles.css      # Global styles
├── angular.json         # Angular configuration
├── package.json         # Frontend dependencies
└── tsconfig.json        # TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. From the project root directory, install dependencies:
```bash
npm install
```

2. Start the Angular development server:
```bash
npm start
```

The frontend will run on `http://localhost:4200`

## 📧 Contact Information

- **Email**: kalyanupadhayayula@gmail.com
- **Phone**: +91 9121650564
- **WhatsApp**: [+91 9121650564](https://wa.me/919121650564)

## ✨ Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **WhatsApp Integration**: Three integration points for easy customer contact
- **Contact Form**: Fully functional with backend API integration
- **Modern UI**: Navy blue theme with smooth animations
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Technology Stack

- **Frontend**: Angular (latest), TypeScript, CSS
- **Backend**: Node.js, Express
- **API**: RESTful API with CORS support

## 📝 API Endpoints

### Contact Form
- **POST** `/api/contact`
  - Body: `{ name, email, phone, message }`
  - Response: `{ success, message }`

### Health Check
- **GET** `/api/health`
  - Response: `{ status: 'OK' }`

## 🎨 Color Scheme

- Primary Navy: `#3d4f6d`
- Primary Blue: `#5b6f8f`
- WhatsApp Green: `#25D366`
- Light Gray: `#f5f7fa`
- White: `#ffffff`

## 📦 Building for Production

### Frontend
```bash
npm run build
```
Output will be in `dist/` directory

### Backend
The backend is production-ready. Just ensure environment variables are properly configured.

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the `backend/` directory:
```
PORT=3000
```

## 📄 License

All rights reserved © 2025 Arbor Technologies

## 🤝 Support

For any questions or support, please contact via:
- Email: kalyanupadhayayula@gmail.com
- WhatsApp: +91 9121650564
