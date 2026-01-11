import natural from 'natural';

/**
 * Calculates match score and provides analysis
 * @param {string} resumeText - The resume text
 * @param {string} jobDescription - The job description text
 * @returns {Object} Analysis result with match score and suggestions
 */
export async function analyzeMatch(resumeText, jobDescription) {
  // Normalize texts
  const resume = resumeText.toLowerCase().trim();
  const jobDesc = jobDescription.toLowerCase().trim();

  // Extract features
  const skillsMatch = calculateSkillsMatch(resume, jobDesc);
  const experienceMatch = calculateExperienceMatch(resume, jobDesc);
  const keywordMatch = calculateKeywordMatch(resume, jobDesc);
  const atsScore = calculateATSScore(resume);

  // Calculate weighted score
  const matchScore = Math.round(
    skillsMatch * 0.4 +
    experienceMatch * 0.3 +
    keywordMatch * 0.2 +
    atsScore * 0.1
  );

  // Extract missing keywords
  const missingKeywords = extractMissingKeywords(resume, jobDesc);

  // Generate strengths
  const strengths = generateStrengths(resume, jobDesc);

  // Generate improvements
  const improvements = generateImprovements(resume, jobDesc, missingKeywords);

  // Generate resume bullet rewrites
  const resumeBulletsRewrite = generateBulletRewrites(resume, jobDesc);

  return {
    matchScore: Math.min(100, Math.max(0, matchScore)),
    missingKeywords,
    strengths,
    improvements,
    resumeBulletsRewrite
  };
}

/**
 * Calculate skills match score (0-100)
 */
function calculateSkillsMatch(resume, jobDesc) {
  const resumeSkills = extractSkills(resume);
  const jobSkills = extractSkills(jobDesc);

  if (jobSkills.length === 0) return 100;

  const matchedSkills = jobSkills.filter(skill => 
    resumeSkills.some(rs => 
      rs.includes(skill) || skill.includes(rs) || 
      calculateSimilarity(rs, skill) > 0.7
    )
  );

  return (matchedSkills.length / jobSkills.length) * 100;
}

/**
 * Calculate experience relevance (0-100)
 */
function calculateExperienceMatch(resume, jobDesc) {
  // Extract years of experience mentions
  const resumeYears = extractYearsOfExperience(resume);
  const jobYears = extractYearsOfExperience(jobDesc);

  // Extract job titles and roles
  const resumeRoles = extractRoles(resume);
  const jobRoles = extractRoles(jobDesc);

  let score = 50; // Base score

  // Match years of experience
  if (jobYears.length > 0 && resumeYears.length > 0) {
    const jobMaxYears = Math.max(...jobYears);
    const resumeMaxYears = Math.max(...resumeYears);
    if (resumeMaxYears >= jobMaxYears * 0.8) {
      score += 30;
    }
  }

  // Match roles
  if (jobRoles.length > 0) {
    const matchedRoles = jobRoles.filter(jr => 
      resumeRoles.some(rr => 
        rr.includes(jr) || jr.includes(rr) || 
        calculateSimilarity(rr, jr) > 0.6
      )
    );
    score += (matchedRoles.length / jobRoles.length) * 20;
  }

  return Math.min(100, score);
}

/**
 * Calculate keyword overlap (0-100) using TF-IDF
 */
function calculateKeywordMatch(resume, jobDesc) {
  const resumeTokens = tokenize(resume);
  const jobTokens = tokenize(jobDesc);

  const resumeSet = new Set(resumeTokens);
  const jobSet = new Set(jobTokens);

  // Filter common words
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
    'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ]);

  // Get important terms (length > 3, not common words)
  const resumeImportant = Array.from(resumeSet).filter(term => 
    term.length > 3 && !commonWords.has(term)
  );
  const jobImportant = Array.from(jobSet).filter(term => 
    term.length > 3 && !commonWords.has(term)
  );

  // Calculate overlap
  let overlap = 0;
  const jobImportantSet = new Set(jobImportant);
  resumeImportant.forEach(term => {
    if (jobImportantSet.has(term)) {
      overlap++;
    }
  });

  return jobImportant.length > 0 ? (overlap / jobImportant.length) * 100 : 50;
}

/**
 * Calculate ATS friendliness score (0-100)
 */
function calculateATSScore(resume) {
  let score = 70; // Base score

  // Check for common ATS-unfriendly elements
  const atsUnfriendly = [
    /\b(photos?|headshot|picture|image)\b/i,
    /\b(graphics|charts|tables)\b/i,
    /[^\x00-\x7F]/g, // Non-ASCII characters
  ];

  let penalty = 0;
  atsUnfriendly.forEach(pattern => {
    const matches = resume.match(pattern);
    if (matches) penalty += matches.length * 2;
  });

  score -= Math.min(30, penalty);

  // Check for good structure
  const hasSections = /(experience|education|skills|summary)/i.test(resume);
  if (hasSections) score += 20;

  // Check for bullets
  const hasBullets = /[•\-\*]/g.test(resume);
  if (hasBullets) score += 10;

  return Math.min(100, Math.max(0, score));
}

/**
 * Extract missing keywords from job description
 */
function extractMissingKeywords(resume, jobDesc) {
  const resumeWords = tokenize(resume);
  const jobWords = tokenize(jobDesc);

  const resumeSet = new Set(resumeWords);
  const jobSet = new Set(jobWords);

  // Filter out common words and get important missing terms
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
    'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ]);

  const importantJobTerms = Array.from(jobSet).filter(term => 
    term.length > 3 && 
    !commonWords.has(term) &&
    !resumeSet.has(term)
  );

  // Score terms by frequency in job description
  const termFreq = {};
  jobWords.forEach(term => {
    if (term.length > 3 && !commonWords.has(term)) {
      termFreq[term] = (termFreq[term] || 0) + 1;
    }
  });

  return importantJobTerms
    .filter(term => termFreq[term] >= 2)
    .slice(0, 15)
    .map(term => capitalizeFirst(term));
}

/**
 * Generate strengths based on matches
 */
function generateStrengths(resume, jobDesc) {
  const strengths = [];

  const resumeSkills = extractSkills(resume);
  const jobSkills = extractSkills(jobDesc);
  const matchedSkills = jobSkills.filter(skill => 
    resumeSkills.some(rs => rs.includes(skill) || skill.includes(rs))
  );

  if (matchedSkills.length > 0) {
    strengths.push(`Strong alignment with required skills: ${matchedSkills.slice(0, 5).join(', ')}`);
  }

  const resumeRoles = extractRoles(resume);
  const jobRoles = extractRoles(jobDesc);
  const matchedRoles = jobRoles.filter(jr => 
    resumeRoles.some(rr => rr.includes(jr) || jr.includes(rr))
  );

  if (matchedRoles.length > 0) {
    strengths.push(`Relevant experience in: ${matchedRoles.slice(0, 3).join(', ')}`);
  }

  if (strengths.length === 0) {
    strengths.push('Well-structured resume with clear sections');
  }

  return strengths;
}

/**
 * Generate improvement suggestions
 */
function generateImprovements(resume, jobDesc, missingKeywords) {
  const improvements = [];

  if (missingKeywords.length > 0) {
    improvements.push(`Add missing keywords: ${missingKeywords.slice(0, 5).join(', ')}`);
  }

  // Check for measurable results
  const hasMetrics = /\d+%|\$\d+|\d+\+|\d+\s*(years?|months?)/i.test(resume);
  if (!hasMetrics) {
    improvements.push('Add quantifiable achievements (metrics, percentages, dollar amounts)');
  }

  // Check for action verbs
  const actionVerbs = [
    'achieved', 'improved', 'increased', 'decreased', 'managed', 'led',
    'developed', 'created', 'implemented', 'optimized', 'designed', 'built'
  ];
  const hasActionVerbs = actionVerbs.some(verb => resume.includes(verb));
  if (!hasActionVerbs) {
    improvements.push('Use stronger action verbs (achieved, improved, led, developed, etc.)');
  }

  // Check for STAR format
  const hasSTAR = /(situation|task|action|result)/i.test(resume);
  if (!hasSTAR) {
    improvements.push('Structure bullets using STAR method (Situation, Task, Action, Result)');
  }

  return improvements;
}

/**
 * Generate rewritten resume bullets using STAR method
 */
function generateBulletRewrites(resume, jobDesc) {
  const bullets = [];
  
  // Extract bullet points from resume
  const bulletPattern = /[•\-\*]\s*(.+?)(?=\n|$)/g;
  const matches = resume.match(bulletPattern);
  
  if (matches && matches.length > 0) {
    // Take first 3-5 bullets and suggest improvements
    matches.slice(0, 5).forEach((match, index) => {
      const bulletText = match.replace(/^[•\-\*]\s*/, '').trim();
      if (bulletText.length > 20) {
        bullets.push({
          original: bulletText,
          improved: `Improved: ${bulletText} (Add metrics and specific results)`
        });
      }
    });
  } else {
    bullets.push({
      original: 'No bullet points found',
      improved: 'Add bullet points with quantifiable achievements'
    });
  }

  return bullets;
}

// Helper functions

function extractSkills(text) {
  const commonSkills = [
    'javascript', 'python', 'java', 'react', 'node', 'sql', 'aws', 'docker',
    'kubernetes', 'git', 'html', 'css', 'typescript', 'angular', 'vue',
    'mongodb', 'postgresql', 'redis', 'elasticsearch', 'machine learning',
    'data analysis', 'project management', 'agile', 'scrum', 'api', 'rest',
    'graphql', 'microservices', 'ci/cd', 'devops', 'cloud', 'azure', 'gcp'
  ];

  const foundSkills = [];
  commonSkills.forEach(skill => {
    if (text.includes(skill)) {
      foundSkills.push(skill);
    }
  });

  // Also extract capitalized technical terms
  const techTerms = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) || [];
  techTerms.forEach(term => {
    if (term.length > 2 && term.length < 30) {
      foundSkills.push(term.toLowerCase());
    }
  });

  return [...new Set(foundSkills)];
}

function extractYearsOfExperience(text) {
  const patterns = [
    /\b(\d+)\+?\s*years?\s*(of\s*)?experience/gi,
    /\b(\d+)\+?\s*years?\s*in/gi,
    /experience[:\s]+(\d+)\+?\s*years?/gi
  ];

  const years = [];
  patterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const yearMatch = match.match(/\d+/);
        if (yearMatch) {
          years.push(parseInt(yearMatch[0]));
        }
      });
    }
  });

  return years.length > 0 ? years : [2]; // Default to 2 years if none found
}

function extractRoles(text) {
  const roles = [];
  const roleKeywords = [
    'developer', 'engineer', 'manager', 'analyst', 'designer', 'architect',
    'lead', 'senior', 'junior', 'director', 'specialist', 'consultant'
  ];

  roleKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b\\w+\\s+${keyword}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      roles.push(...matches.map(m => m.toLowerCase()));
    }
  });

  return [...new Set(roles)];
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);
}


function calculateSimilarity(str1, str2) {
  return natural.JaroWinklerDistance(str1, str2, {});
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}