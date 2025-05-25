# HealthInsight

A comprehensive health and wellness platform that helps users track and improve their health metrics.

## Project Structure

```
HealthInsight/
├── frontend/     # React frontend application
├── backend/      # Node.js/Express backend server
└── README.md     # Project documentation
```

## Features

- User authentication and profile management
- Health metrics tracking and visualization
- Personalized health insights and recommendations
- Interactive dashboard for health monitoring
- Advanced search capabilities with Elasticsearch
- Scalable cloud infrastructure with Google Cloud Platform

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Elasticsearch
- Google Cloud Platform account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/HealthInsight.git
cd HealthInsight
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

4. Set up environment variables
- Create `.env` files in both frontend and backend directories
- Follow the `.env.example` files for required variables
- Configure GCP credentials and Elasticsearch connection details

### Running the Application

1. Start the backend server
```bash
cd backend
npm start
```

2. Start the frontend development server
```bash
cd frontend
npm start
```

## Technologies Used

### Frontend
- React.js - UI framework
- Material-UI - Component library
- Redux - State management
- Axios - HTTP client

### Backend
- Node.js - Runtime environment
- Express.js - Web framework
- JWT - Authentication
- Mongoose - MongoDB ODM

### Database & Search
- MongoDB - Primary database
- Elasticsearch - Search engine and analytics
- Redis - Caching layer

### Cloud Infrastructure
- Google Cloud Platform (GCP)
  - Cloud Run - Container hosting
  - Cloud Storage - File storage
  - Cloud SQL - Managed database
  - Cloud Functions - Serverless functions

### DevOps & Tools
- Docker - Containerization
- GitHub Actions - CI/CD
- Jest - Testing framework
- ESLint - Code linting