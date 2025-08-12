import { NextApiRequest, NextApiResponse } from 'next';

// ====== RESPONSE TYPE ======
interface TestResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: {
    status: string;
    environment: string;
    nextjsVersion: string;
    nodeVersion: string;
    uptime: number;
    endpoints: {
      test: string;
      upload: string;
    };
  };
}

// ====== MAIN HANDLER ======
export default function handler(req: NextApiRequest, res: NextApiResponse<TestResponse>) {
  // ====== CORS HEADERS ======
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ====== PREFLIGHT HANDLING ======
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // ====== METHOD VALIDATION ======
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
      timestamp: new Date().toISOString(),
      data: {
        status: 'error',
        environment: process.env.NODE_ENV || 'unknown',
        nextjsVersion: 'unknown',
        nodeVersion: process.version,
        uptime: process.uptime(),
        endpoints: {
          test: '/api/test',
          upload: '/api/upload',
        },
      },
    });
    return;
  }

  // ====== SUCCESS RESPONSE ======
  const response: TestResponse = {
    success: true,
    message: '✅ 404MOVERS API is online and ready!',
    timestamp: new Date().toISOString(),
    data: {
      status: 'online',
      environment: process.env.NODE_ENV || 'development',
      nextjsVersion: require('next/package.json').version,
      nodeVersion: process.version,
      uptime: Math.floor(process.uptime()),
      endpoints: {
        test: '/api/test',
        upload: '/api/upload',
      },
    },
  };

  console.log(`🧪 API test endpoint called - ${response.timestamp}`);
  res.status(200).json(response);
}
