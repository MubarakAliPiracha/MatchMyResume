# Resume Match AI

An AI-powered resume analysis tool that matches your resume against job descriptions and provides actionable insights to improve your chances of landing the job.

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

## Extending with Real LLMs

To enhance the analysis with OpenAI or other LLMs:

1. **Add OpenAI SDK**:
```bash
cd backend
npm install openai
```

2. **Update `matchAnalyzer.js`**:
   - Replace TF-IDF keyword extraction with OpenAI embeddings
   - Use `text-embedding-ada-002` for semantic similarity
   - Calculate cosine similarity between embeddings

3. **Example integration**:
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getEmbedding(text) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return response.data[0].embedding;
}

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
```

4. **Environment Variables**:
Create a `.env` file in the backend directory:
```
OPENAI_API_KEY=your_api_key_here
```

## Code Quality

- Modular folder structure
- Clear function names
- Comments only where logic is non-obvious
- No unused dependencies
- Error handling throughout

## Deployment

The application can be deployed to various platforms. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

**Backend (Railway/Render):**
- Connect your GitHub repository
- Select the `backend` folder
- Set environment variables
- Deploy automatically

**Frontend (Vercel/Netlify):**
- Connect your GitHub repository
- Select the `frontend` folder
- Set `VITE_API_URL` environment variable
- Deploy automatically

For step-by-step instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.