# Resume Match AI

An AI-powered resume analysis tool that matches your resume against job descriptions and provides actionable insights to improve your chances of landing the job.

## 🌐 Live Demo

**Try it now:** [https://match-my-resume-two.vercel.app](https://match-my-resume-two.vercel.app)

## Features

- **Resume Upload**: Support for PDF and DOCX formats
- **Job Description Analysis**: Paste any job description for comparison
- **Match Scoring**: Comprehensive scoring based on:
  - Skills match (40%)
  - Experience relevance (30%)
  - Keyword overlap (20%)
  - ATS friendliness (10%)
- **Actionable Insights**: 
  - Missing keywords identification
  - Strengths highlighting
  - Improvement suggestions
  - Resume bullet rewrites

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **NLP**: Natural.js (TF-IDF + cosine similarity)
- **Parsing**: 
  - `pdf-parse` for PDF files
  - `mammoth` for DOCX files

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

4. Build for production:
```bash
npm run build
```

## Usage

1. Start both the backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Upload your resume (PDF or DOCX)
4. Paste the job description
5. Click "Analyze Match" to get your results

## API Endpoints

### POST `/api/parse-resume`

Parses a resume file and extracts text content.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: Form data with `resume` field (file)

**Response:**
```json
{
  "text": "Extracted resume text content..."
}
```

### POST `/api/analyze-match`

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
    "Add quantifiable achievements (metrics, percentages, dollar amounts)"
  ],
  "resumeBulletsRewrite": [
    {
      "original": "Developed web applications",
      "improved": "Improved: Developed web applications (Add metrics and specific results)"
    }
  ]
}
```

## Scoring Logic

The match score is calculated using a weighted formula:

- **Skills Match (40%)**: Compares skills mentioned in both resume and job description
- **Experience Relevance (30%)**: Analyzes years of experience and role relevance
- **Keyword Overlap (20%)**: Uses TF-IDF to find important keyword matches
- **ATS Friendliness (10%)**: Checks for ATS-friendly formatting and structure

Final score is normalized to 0-100.

## Project Structure

```
.
├── backend/
│   ├── server.js              # Express server setup
│   ├── services/
│   │   ├── resumeParser.js    # PDF/DOCX parsing logic
│   │   └── matchAnalyzer.js   # Scoring and analysis logic
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResumeUpload.jsx
│   │   │   ├── JobDescriptionInput.jsx
│   │   │   └── AnalysisResults.jsx
│   │   ├── services/
│   │   │   └── api.js         # API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Deployment

This application is deployed using free-tier hosting:

- **Frontend**: [Vercel.com](https://vercel.com) (Free tier - permanent)
- **Backend**: [Render.com](https://render.com) (Free tier - permanent)

**Live Demo**: [https://match-my-resume-two.vercel.app](https://match-my-resume-two.vercel.app)

For detailed deployment instructions, see [FREE_DEPLOYMENT.md](./FREE_DEPLOYMENT.md) or [QUICK_DEPLOY.md](./QUICK_DEPLOY.md).

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.