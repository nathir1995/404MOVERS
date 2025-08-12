import { NextApiRequest, NextApiResponse } from 'next';

// ====== API RESPONSE TYPES ======
interface ApiResponse {
  success: boolean;
  message: string;
  timestamp: string;
  method: string;
  data?: any;
  error?: string;
  version?: string;
}

// ====== MAIN HANDLER ======
export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { method, headers, query, body } = req;
  const timestamp = new Date().toISOString();

  // ====== CORS HEADERS ======
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  // ====== OPTIONS REQUEST (PREFLIGHT) ======
  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // ====== LOGGING ======
  console.log(`🔍 API Test - ${method} request at ${timestamp}`);
  console.log(`📍 User-Agent: ${headers['user-agent']}`);
  console.log(`🌐 Origin: ${headers.origin || 'Direct'}`);

  try {
    // ====== GET REQUEST ======
    if (method === 'GET') {
      const response: ApiResponse = {
        success: true,
        message: '✅ 404MOVERS API Routes are working perfectly!',
        timestamp,
        method: 'GET',
        version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
        data: {
          environment: process.env.NODE_ENV,
          appName: process.env.NEXT_PUBLIC_APP_NAME || '404MOVERS',
          serverTime: timestamp,
          uptime: process.uptime(),
          queryParams: query,
          availableEndpoints: [
            'GET /api/test - This endpoint',
            'POST /api/test - Echo test',
            'POST /api/upload - File upload & processing',  // ✅ CORRECTED: Updated endpoint reference
          ],
        },
      };

      console.log('✅ GET test successful');
      res.status(200).json(response);
      return;
    }

    // ====== POST REQUEST ======
    if (method === 'POST') {
      const response: ApiResponse = {
        success: true,
        message: '✅ POST method is working! Echo response:',
        timestamp,
        method: 'POST',
        data: {
          receivedBody: body,
          bodyType: typeof body,
          contentType: headers['content-type'],
          bodyLength: JSON.stringify(body).length,
          echo: body,
        },
      };

      console.log('✅ POST test successful');
      console.log('📦 Received body:', body);
      res.status(200).json(response);
      return;
    }

    // ====== UNSUPPORTED METHOD ======
    const errorResponse: ApiResponse = {
      success: false,
      message: `❌ Method ${method} not allowed`,
      timestamp,
      method: method || 'UNKNOWN',
      error: `The ${method} method is not supported by this endpoint`,
      data: {
        allowedMethods: ['GET', 'POST', 'OPTIONS'],
        suggestion: 'Use GET to test basic connectivity or POST to test data echo',
      },
    };

    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    console.log(`❌ Unsupported method: ${method}`);
    res.status(405).json(errorResponse);

  } catch (error: any) {
    // ====== ERROR HANDLING ======
    console.error('💥 API Test Error:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      message: '💥 Internal server error in test endpoint',
      timestamp,
      method: method || 'UNKNOWN',
      error: error.message || 'Unknown error occurred',
      data: {
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
    };

    res.status(500).json(errorResponse);
  }
}
