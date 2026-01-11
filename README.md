# 🎯 Resume Match AI

<div align="center">

**An AI-powered resume analysis tool that matches your resume against job descriptions and provides actionable insights to improve your chances of landing the job.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-brightgreen)](https://match-my-resume-two.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)

**[🌐 Live Demo](https://match-my-resume-two.vercel.app)** | **[📖 Documentation](./FREE_DEPLOYMENT.md)** | **[🚀 Quick Deploy](./QUICK_DEPLOY.md)**

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🌐 Live Demo](#-live-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [💻 Usage](#-usage)
- [🔌 API Documentation](#-api-documentation)
- [📊 How It Works](#-how-it-works)
- [🚢 Deployment](#-deployment)
- [📁 Project Structure](#-project-structure)
- [🧪 Testing](#-testing)
- [🔮 Future Enhancements](#-future-enhancements)
- [📄 License](#-license)

---

## ✨ Features

### Core Functionality
- ✅ **Resume Upload** - Support for PDF and DOCX formats with drag & drop
- ✅ **Job Description Analysis** - Paste any job description for instant comparison
- ✅ **Match Scoring** - Comprehensive 0-100% match score based on multiple factors
- ✅ **Missing Keywords Detection** - Identifies important skills missing from your resume
- ✅ **Strengths Highlighting** - Shows what you're doing well
- ✅ **Actionable Improvements** - Specific suggestions to improve your resume
- ✅ **Resume Bullet Rewrites** - Suggestions for better bullet points
- ✅ **ATS-Friendly Feedback** - Checks resume format compatibility

### Match Scoring Algorithm
The match score is calculated using a weighted formula:
- **Skills Match (40%)** - Compares technical skills and keywords
- **Experience Relevance (30%)** - Analyzes years of experience and role match
- **Keyword Overlap (20%)** - TF-IDF based keyword matching
- **ATS Friendliness (10%)** - Formatting and structure analysis

---

## 🚀 Quick Start

### Option 1: Use Live Demo (Recommended)
Visit the **[Live Demo](https://match-my-resume-two.vercel.app)** and start analyzing immediately - no setup required!

### Option 2: Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/MubarakAliPiracha/MatchMyResume.git
   cd MatchMyResume
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Start development servers**
   
   Terminal 1 (Backend):
   ```bash
   npm run dev:backend
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm run dev:frontend
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 🌐 Live Demo

### 🎯 Production URLs

- **Frontend (Live Application)**: [https://match-my-resume-two.vercel.app](https://match-my-resume-two.vercel.app)
- **Backend API**: [https://matchmyresume-43km.onrender.com](https://matchmyresume-43km.onrender.com)
- **API Health Check**: [https://matchmyresume-43km.onrender.com/health](https://matchmyresume-43km.onrender.com/health)

### 🧪 Test the API

```bash
# Health check
curl https://matchmyresume-43km.onrender.com/health

# Expected response: {"status":"ok"}
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management

### Backend
- **Node.js 18+** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### AI/NLP
- **Natural.js** - Natural language processing
- **TF-IDF** - Keyword extraction and weighting
- **Jaro-Winkler Distance** - String similarity matching

### File Parsing
- **pdf-parse** - PDF text extraction
- **mammoth** - DOCX to text conversion

### Deployment
- **Vercel** - Frontend hosting (free tier)
- **Render** - Backend hosting (free tier)

---

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm 9+ or yarn
- Git

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MubarakAliPiracha/MatchMyResume.git
   cd MatchMyResume
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables** (Optional for local development)
   
   Create `backend/.env`:
   ```env
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```
   
   Create `frontend/.env.local`:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

---

## 💻 Usage

### Web Application

1. **Upload Resume**
   - Click "Upload Resume" or drag & drop
   - Supported formats: PDF, DOCX
   - Maximum file size: 10MB

2. **Enter Job Description**
   - Paste the job description in the text area
   - Full text is analyzed, so include all requirements

3. **Analyze Match**
   - Click "Analyze Match" button
   - Wait a few seconds for analysis
   - Review your results:
     - Match score (0-100%)
     - Missing keywords
     - Strengths
     - Suggested improvements
     - Resume bullet suggestions

### Programmatic API Usage

```javascript
// Parse resume
const formData = new FormData();
formData.append('resume', file);

const parseResponse = await fetch('https://matchmyresume-43km.onrender.com/api/parse-resume', {
  method: 'POST',
  body: formData
});
const { text } = await parseResponse.json();

// Analyze match
const analyzeResponse = await fetch('https://matchmyresume-43km.onrender.com/api/analyze-match', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    resumeText: text,
    jobDescription: 'Job description here...'
  })
});
const results = await analyzeResponse.json();
console.log(results.matchScore); // 0-100
```

---

## 🔌 API Documentation

### Base URL
```
Production: https://matchmyresume-43km.onrender.com
Local: http://localhost:3001
```

### Endpoints

#### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

#### `POST /api/parse-resume`
Parses a resume file and extracts text content.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with `resume` field (PDF or DOCX file)

**Response:**
```json
{
  "text": "Extracted resume text content..."
}
```

**Example:**
```bash
curl -X POST https://matchmyresume-43km.onrender.com/api/parse-resume \
  -F "resume=@your-resume.pdf"
```

#### `POST /api/analyze-match`
Analyzes the match between resume and job description.

**Request:**
```json
{
  "resumeText": "Resume text content...",
  "jobDescription": "Job description text..."
}
```

**Response:**
```json
{
  "matchScore": 78,
  "missingKeywords": ["React", "TypeScript", "AWS"],
  "strengths": [
    "Strong alignment with required skills: JavaScript, Node.js, Express"
  ],
  "improvements": [
    "Add missing keywords: React, TypeScript, AWS",
    "Add quantifiable achievements (metrics, percentages, dollar amounts)",
    "Use stronger action verbs (achieved, improved, led, developed, etc.)"
  ],
  "resumeBulletsRewrite": [
    {
      "original": "Developed web applications",
      "improved": "Improved: Developed web applications (Add metrics and specific results)"
    }
  ]
}
```

**Example:**
```bash
curl -X POST https://matchmyresume-43km.onrender.com/api/analyze-match \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "JavaScript Developer with 5 years experience...",
    "jobDescription": "Looking for JavaScript Developer with React..."
  }'
```

---

## 📊 How It Works

### Matching Algorithm

The system uses a multi-factor analysis approach:

1. **Skills Extraction** (40% weight)
   - Identifies technical skills from both resume and job description
   - Uses fuzzy matching to handle variations (e.g., "React" = "React.js")
   - Calculates percentage of required skills present

2. **Experience Matching** (30% weight)
   - Extracts years of experience using regex patterns
   - Compares resume experience vs job requirements
   - Matches job titles and role keywords

3. **Keyword Analysis** (20% weight)
   - Uses TF-IDF to identify important keywords
   - Filters out common words
   - Calculates overlap percentage

4. **ATS Compatibility** (10% weight)
   - Checks for resume structure (sections, bullets)
   - Identifies ATS-unfriendly elements (images, graphics)
   - Validates formatting standards

### Final Score Calculation

```
Match Score = (Skills × 0.4) + (Experience × 0.3) + (Keywords × 0.2) + (ATS × 0.1)
```

Score is normalized to 0-100%.

---

## 🚢 Deployment

This application is deployed using free-tier hosting services:

- **Frontend**: [Vercel](https://vercel.com) (Free tier - permanent)
- **Backend**: [Render](https://render.com) (Free tier - permanent)

**Total Cost: $0/month - Forever!**

### Deployment Documentation

- **[Quick Deploy Guide](./QUICK_DEPLOY.md)** - Deploy in 10-15 minutes
- **[Complete Deployment Guide](./FREE_DEPLOYMENT.md)** - Detailed step-by-step instructions
- **[Deployment Options](./DEPLOYMENT.md)** - All available hosting options

### Quick Deploy Steps

1. **Backend (Render)**
   - Sign up at [render.com](https://render.com)
   - Create Web Service
   - Set Root Directory to `backend`
   - Select Free plan
   - Deploy!

2. **Frontend (Vercel)**
   - Sign up at [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Set Root Directory to `frontend`
   - Add environment variable: `VITE_API_URL` = your backend URL + `/api`
   - Deploy!

For detailed instructions, see [FREE_DEPLOYMENT.md](./FREE_DEPLOYMENT.md).

---

## 📁 Project Structure

```
MatchMyResume/
├── backend/
│   ├── server.js                 # Express server and API routes
│   ├── services/
│   │   ├── resumeParser.js       # PDF/DOCX parsing logic
│   │   └── matchAnalyzer.js      # Scoring and analysis algorithms
│   ├── render.yaml               # Render deployment config
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResumeUpload.jsx       # File upload component
│   │   │   ├── JobDescriptionInput.jsx # Job description textarea
│   │   │   └── AnalysisResults.jsx    # Results display component
│   │   ├── services/
│   │   │   └── api.js            # API client
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── vercel.json               # Vercel deployment config
│   ├── netlify.toml              # Netlify deployment config
│   └── package.json
├── DEPLOYMENT.md                 # Deployment options guide
├── FREE_DEPLOYMENT.md            # Free hosting guide
├── QUICK_DEPLOY.md               # Quick deployment guide
├── TESTING_GUIDE.md              # Testing and verification guide
├── QUICK_TEST.md                 # Quick accuracy test
└── README.md                     # This file
```

---

## 🧪 Testing

### Quick Accuracy Test

Test the system's accuracy with provided test cases:

1. **Perfect Match Test**
   - Resume: "JavaScript, React, Node.js, 5 years"
   - Job: "JavaScript Developer, React, Node.js, 3+ years"
   - Expected Score: 75-90%

2. **Poor Match Test**
   - Resume: "Marketing, Sales, 2 years"
   - Job: "JavaScript Developer, React, Node.js, 3+ years"
   - Expected Score: 20-40%

If perfect match scores higher → System is working correctly! ✅

### Testing Documentation

- **[Testing Guide](./TESTING_GUIDE.md)** - Comprehensive testing documentation
- **[Quick Test](./QUICK_TEST.md)** - 2-minute accuracy test

### Manual Testing

```bash
# Test backend health
curl https://matchmyresume-43km.onrender.com/health

# Test resume parsing (with actual file)
curl -X POST https://matchmyresume-43km.onrender.com/api/parse-resume \
  -F "resume=@test-resume.pdf"

# Test match analysis
curl -X POST https://matchmyresume-43km.onrender.com/api/analyze-match \
  -H "Content-Type: application/json" \
  -d '{"resumeText":"...","jobDescription":"..."}'
```

---

## 🔮 Future Enhancements

### Planned Features
- 🔄 **OpenAI Integration** - Use embeddings for semantic matching
- 📊 **Advanced Analytics** - Detailed match breakdown charts
- 💾 **Save History** - Store and compare multiple analyses
- 📧 **Export Reports** - PDF/HTML export of analysis results
- 🌐 **Multiple Languages** - Support for non-English resumes
- 🔐 **User Accounts** - Personal dashboard and resume library
- 📈 **Trend Analysis** - Track resume improvements over time

### Upgrade Path

To enhance accuracy with OpenAI embeddings:

1. Add OpenAI SDK:
   ```bash
   cd backend
   npm install openai
   ```

2. Update `matchAnalyzer.js` to use embeddings
3. Add `OPENAI_API_KEY` environment variable
4. Deploy updated version

See [README.md](./README.md#extending-with-real-llms) for detailed instructions.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Mubarak Ali Piracha**

- GitHub: [@MubarakAliPiracha](https://github.com/MubarakAliPiracha)
- Repository: [MatchMyResume](https://github.com/MubarakAliPiracha/MatchMyResume)

---

## 🙏 Acknowledgments

- [Natural.js](https://github.com/NaturalNode/natural) - NLP library
- [pdf-parse](https://github.com/mozilla/pdf.js) - PDF parsing
- [mammoth](https://github.com/mwilliamson/mammoth.js) - DOCX parsing
- [Vercel](https://vercel.com) - Frontend hosting
- [Render](https://render.com) - Backend hosting

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

**[🔝 Back to Top](#-resume-match-ai)**

</div>