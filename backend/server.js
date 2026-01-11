import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { parseResume } from './services/resumeParser.js';
import { analyzeMatch } from './services/matchAnalyzer.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX files are allowed.'));
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Parse resume endpoint
app.post('/api/parse-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const text = await parseResume(req.file.buffer, req.file.mimetype);
    res.json({ text });
  } catch (error) {
    console.error('Error parsing resume:', error);
    res.status(500).json({ error: error.message || 'Failed to parse resume' });
  }
});

// Analyze match endpoint
app.post('/api/analyze-match', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ 
        error: 'Both resumeText and jobDescription are required' 
      });
    }

    const result = await analyzeMatch(resumeText, jobDescription);
    res.json(result);
  } catch (error) {
    console.error('Error analyzing match:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze match' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});