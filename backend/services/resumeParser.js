import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

/**
 * Parses a resume file (PDF or DOCX) and extracts text content
 * @param {Buffer} fileBuffer - The file buffer
 * @param {string} mimeType - The MIME type of the file
 * @returns {Promise<string>} - Extracted text content
 */
export async function parseResume(fileBuffer, mimeType) {
  try {
    if (mimeType === 'application/pdf') {
      const data = await pdfParse(fileBuffer);
      return data.text;
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/msword'
    ) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return result.value;
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    throw new Error(`Failed to parse resume: ${error.message}`);
  }
}