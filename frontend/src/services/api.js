const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function parseResume(formData) {
  const response = await fetch(`${API_BASE_URL}/parse-resume`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to parse resume');
  }

  const data = await response.json();
  return data.text;
}

export async function analyzeMatch(resumeText, jobDescription) {
  const response = await fetch(`${API_BASE_URL}/analyze-match`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resumeText,
      jobDescription,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to analyze match');
  }

  return await response.json();
}