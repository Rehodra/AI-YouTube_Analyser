# TubeIntelligence - AI-Powered YouTube Analytics Platform

> **Stop guessing. Start growing.** Get AI-powered insights that tell you *exactly* what to fix, what to post next, and how to 10x your YouTube channel growth—delivered straight to your inbox.

![Platform](https://img.shields.io/badge/Platform-YouTube-red)
![AI](https://img.shields.io/badge/AI-Gemini%202.5-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Live Demo

**[Try TubeIntelligence Live](#)** *(Coming Soon)*

<!-- Replace the # above with your deployed URL when ready -->

## Screenshots

### Landing Page
![TubeIntelligence Home](./screenshots/home.png)
*Clean, modern interface showcasing the platform's core value proposition*

### Analysis Configuration
![Configure Analysis](./screenshots/audit.png)
*Select AI-powered intelligence modules for your channel audit*

##  Overview

**TubeIntelligence** uses **Google's Gemini 2.5 AI** to analyze YouTube channels and provide actionable growth strategies. Simply enter a channel name, select the AI services you need, and receive a comprehensive report with:

- **AI-generated title alternatives** that predict higher click-through rates
- **Copyright risk detection** before you upload
- **Trending topic predictions** 24-72 hours ahead of the curve
- **Multi-platform content strategies** optimized for YouTube, X/Twitter, and LinkedIn
- **Detailed email reports** delivered straight to your inbox

The platform combines YouTube Data API for channel metrics, Gemini AI for intelligent analysis, and a modern React frontend to deliver insights that would take hours of manual research—in just minutes.

## Features

### Core Services

1. **Semantic Title Engine**
   - AI-generated title alternatives with CTR potential ratings
   - Psychological analysis of title effectiveness
   - Channel-specific title strategy recommendations

2. **Predictive CTR Analysis**
   - Estimate click-through rates before publishing
   - Thumbnail and title psychology insights
   - Industry benchmark comparisons

3. **Multi-Platform Mastery**
   - Cross-platform content optimization (YouTube, X/Twitter, LinkedIn)
   - Platform-specific algorithm insights
   - Content adaptation strategies

4. **Copyright Protection**
   - Pre-upload Content ID scanning simulation
   - Risk assessment for copyrighted material
   - Safe alternative recommendations

5. **Fair Use Analysis**
   - Transformative content evaluation
   - Legal safety guidance
   - Fair use factor breakdown

6. **Trend Intelligence**
   - 48-hour early trend detection
   - Niche-specific trending topics
   - Actionable content ideas

### Authentication & User Management

- Email/password authentication with JWT
- Google OAuth integration
- User profiles with avatar support (Cloudinary)
- Secure session management

### Dashboard Features

- Real-time job status tracking
- Historical report access
- Detailed analytics visualization
- PDF report export
- **Email delivery** - Get your complete analysis report sent directly to your inbox

## Tech Stack

### Backend
- **Framework:** FastAPI (Python)
- **Database:** MongoDB (Motor async driver)
- **AI:** Google Gemini 2.5 Flash
- **Authentication:** JWT, OAuth 2.0 (Authlib)
- **APIs:** YouTube Data API v3
- **Storage:** Cloudinary (avatar uploads)
- **Security:** bcrypt password hashing

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router v7
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **State Management:** Context API

## 📁 Project Structure

```
yt-recomender/
├── backend/
│   ├── app/
│   │   ├── core/          # Configuration, worker
│   │   ├── db/            # Database utilities
│   │   ├── models/        # Pydantic models
│   │   ├── routes/        # API endpoints
│   │   ├── schemas/       # Request/response schemas
│   │   ├── services/      # Business logic (AI, YouTube, MongoDB)
│   │   └── utils/         # Auth helpers, session management
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context providers
│   │   ├── pages/         # Route pages
│   │   ├── services/      # API client
│   │   └── Css/           # Custom styles
│   ├── package.json
│   └── .env
└── deployment_guide.md
```

## Getting Started

### Prerequisites

- **Python** 3.10+
- **Node.js** 18+
- **MongoDB** (local or Atlas)
- **API Keys:**
  - Google Gemini API
  - YouTube Data API v3
  - Cloudinary account
  - Google OAuth credentials

### Backend Setup

1. **Clone and navigate to backend**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   source .venv/bin/activate  # macOS/Linux
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   Create `.env` file in `backend/` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017  # for local
   DATABASE_NAME=yt_recommender
   JWT_SECRET_KEY=your-secret-key-here
   JWT_ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=10080
   
   YOUTUBE_API_KEY=your-youtube-api-key
   GEMINI_API_KEY=your-gemini-api-key
   
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   ENVIRONMENT=development
   ```

5. **Run the server**
   ```bash
   uvicorn app.main:app --reload
   ```

   Server will start at `http://localhost:8000`
   - API Docs: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create `.env` file in `frontend/` directory:
   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Frontend will start at `http://localhost:5173`

## Usage

1. **Register/Login**
   - Create an account or use Google OAuth
   - Access your personalized dashboard

2. **Submit Analysis Request**
   - Enter YouTube channel name (e.g., `@ApnaCollegeOfficial`)
   - Select desired AI services
   - Submit for analysis

3. **View Results**
   - Track job status in real-time
   - Access detailed reports with AI insights
   - Export reports as PDF

4. **Manage Profile**
   - Update profile information
   - Upload custom avatar
   - View analysis history

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user
- `GET /auth/google` - Google OAuth
- `PUT /auth/profile` - Update profile

### Jobs
- `POST /submit` - Submit analysis job
- `GET /job/{job_id}` - Get job status

### Database
- `GET /api/db-test` - Test database connection

## Deployment

See [deployment_guide.md](./deployment_guide.md) for detailed instructions on deploying to:
- **Frontend:** Vercel
- **Backend:** Render

## Security Features

- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt
- CORS protection
- Environment-based security settings
- OAuth 2.0 integration
- Input validation with Pydantic

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- **Google Gemini AI** for powerful language models
- **YouTube Data API** for channel and video data
- **Cloudinary** for media management
- **FastAPI** for the excellent web framework
- **React** and **Vite** for modern frontend development

## Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for YouTube Creators**
