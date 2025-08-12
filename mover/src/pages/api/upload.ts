import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// ====== TYPES ======
interface UploadResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data?: any;
  error?: string;
  requestId?: string;
}

// ====== CONFIGURATION ======
const CONFIG = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedTypes: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif'],
  uploadDir: 'uploads',
  backendUrl: 'https://api.404movers.ca',
};

// ====== DISABLE NEXT.JS BODY PARSING ======
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '100mb',
  },
};

// ====== UTILITY FUNCTIONS ======
function generateRequestId(): string {
  return crypto.randomBytes(8).toString('hex');
}

function validateFileType(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase().substring(1);
  return CONFIG.allowedTypes.includes(ext);
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 100);
}

async function ensureUploadDir(): Promise<string> {
  const uploadDir = path.join(process.cwd(), CONFIG.uploadDir);
  const dateDir = path.join(uploadDir, new Date().toISOString().split('T')[0]);
  
  if (!fs.existsSync(dateDir)) {
    fs.mkdirSync(dateDir, { recursive: true });
  }
  
  return dateDir;
}

// ====== FORWARD TO BACKEND ======
async function forwardToBackend(data: any, requestId: string): Promise<void> {
  try {
    console.log(`🔄 [${requestId}] Forwarding to 404movers backend...`);
    
    const response = await fetch(`${CONFIG.backendUrl}/api/documents/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Request-ID': requestId,
        'X-Source': 'nextjs-upload',
      },
      body: JSON.stringify({
        upload_data: data,
        request_id: requestId,
        timestamp: new Date().toISOString(),
        source: 'next_upload_api',
      }),
    });

    if (response.ok) {
      console.log(`✅ [${requestId}] Backend integration successful`);
    } else {
      console.warn(`⚠️ [${requestId}] Backend responded with ${response.status}`);
    }
  } catch (error: any) {
    console.error(`❌ [${requestId}] Backend integration failed:`, error.message);
    // Don't throw - upload should succeed even if backend fails
  }
}

// ====== MAIN HANDLER ======
export default async function handler(req: NextApiRequest, res: NextApiResponse<UploadResponse>) {
  const requestId = generateRequestId();
  const timestamp = new Date().toISOString();

  // ====== CORS & SECURITY HEADERS ======
  // Restrict CORS to trusted domains only
  const allowedOrigins = [
    'https://404movers.ca',
    'https://www.404movers.ca',
    'https://admin.404movers.ca',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null
  ].filter(Boolean);
  
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('X-Request-ID', requestId);

  // ====== PREFLIGHT HANDLING ======
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // ====== METHOD VALIDATION ======
  if (req.method !== 'POST') {
    console.log(`❌ [${requestId}] Invalid method: ${req.method}`);
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
      timestamp,
      requestId,
      error: 'Only POST requests are accepted for file uploads',
    });
    return;
  }

  console.log(`📤 [${requestId}] Upload request started`);

  try {
    // ====== SETUP UPLOAD DIRECTORY ======
    const uploadDir = await ensureUploadDir();
    console.log(`📁 [${requestId}] Upload directory: ${uploadDir}`);

    // ====== CONFIGURE FORMIDABLE ======
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: CONFIG.maxFileSize,
      maxFiles: 10,
      multiples: true,
      filename: (name, ext, part) => {
        const sanitized = sanitizeFilename(part.originalFilename || 'unknown');
        const timestamp = Date.now();
        return `${timestamp}_${sanitized}`;
      },
    });

    // ====== PARSE REQUEST ======
    console.log(`⚙️ [${requestId}] Parsing upload request...`);
    const [fields, files] = await form.parse(req);

    console.log(`📝 [${requestId}] Fields:`, Object.keys(fields));
    console.log(`📎 [${requestId}] Files:`, Object.keys(files));

    // ====== PROCESS FILES ======
    const processedFiles = [];
    
    for (const [fieldName, fileArray] of Object.entries(files)) {
      const filesArray = Array.isArray(fileArray) ? fileArray : [fileArray];
      
      for (const file of filesArray) {
        if (!file || !file.originalFilename) continue;

        // ====== VALIDATE FILE ======
        if (!validateFileType(file.originalFilename)) {
          console.warn(`⚠️ [${requestId}] Invalid file type: ${file.originalFilename}`);
          if (fs.existsSync(file.filepath)) {
            fs.unlinkSync(file.filepath);
          }
          continue;
        }

        if (file.size > CONFIG.maxFileSize) {
          console.warn(`⚠️ [${requestId}] File too large: ${file.originalFilename}`);
          if (fs.existsSync(file.filepath)) {
            fs.unlinkSync(file.filepath);
          }
          continue;
        }

        // ====== PROCESS VALID FILE ======
        const processedFile = {
          fieldName,
          originalName: file.originalFilename,
          filename: path.basename(file.filepath),
          filepath: file.filepath,
          mimetype: file.mimetype || 'application/octet-stream',
          size: file.size,
        };

        processedFiles.push(processedFile);
        console.log(`✅ [${requestId}] Processed: ${file.originalFilename} → ${processedFile.filename}`);
      }
    }

    // ====== BUILD RESPONSE DATA ======
    const uploadData = {
      source: fields.source?.[0] || 'direct_upload',
      files: processedFiles,
      metadata: {
        userAgent: req.headers['user-agent'],
        origin: req.headers.origin,
        contentType: req.headers['content-type'],
      },
    };

    // ====== FORWARD TO BACKEND ======
    if (processedFiles.length > 0) {
      await forwardToBackend(uploadData, requestId);
    }

    // ====== SUCCESS RESPONSE ======
    const successResponse: UploadResponse = {
      success: true,
      message: `✅ Upload successful! Processed ${processedFiles.length} file${processedFiles.length !== 1 ? 's' : ''}`,
      timestamp,
      requestId,
      data: {
        filesProcessed: processedFiles.length,
        files: processedFiles.map(file => ({
          originalName: file.originalName,
          filename: file.filename,
          size: file.size,
          type: file.mimetype,
        })),
        uploadDirectory: uploadDir,
      },
    };

    console.log(`🎉 [${requestId}] Upload complete: ${processedFiles.length} files processed`);
    res.status(200).json(successResponse);

  } catch (error: any) {
    // ====== ERROR HANDLING ======
    console.error(`💥 [${requestId}] Upload error:`, error);

    const errorResponse: UploadResponse = {
      success: false,
      message: '💥 Upload failed',
      timestamp,
      requestId,
      error: error.message || 'Unknown error occurred',
    };

    let statusCode = 500;
    if (error.message.includes('maxFileSize')) statusCode = 413;
    if (error.message.includes('maxFiles')) statusCode = 400;

    res.status(statusCode).json(errorResponse);
  }
}
