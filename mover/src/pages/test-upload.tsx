import React, { useState, useEffect } from "react";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";
import DocumentTitle from "@/components/meta/DocumentTitle";
import EmailUploadTest from "@/components/EmailUploadTest";

// ====== SYSTEM STATUS COMPONENT ======
const SystemStatus: React.FC = () => {
  const [status, setStatus] = useState<{
    api: 'checking' | 'online' | 'offline';
    upload: 'checking' | 'ready' | 'error';
    timestamp: string;
  }>({
    api: 'checking',
    upload: 'checking',
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Check basic API
        const apiResponse = await fetch('/api/test');
        const apiOnline = apiResponse.ok;

        // Check upload endpoint
        const uploadResponse = await fetch('/api/email/upload', { method: 'OPTIONS' });
        const uploadReady = uploadResponse.ok;

        setStatus({
          api: apiOnline ? 'online' : 'offline',
          upload: uploadReady ? 'ready' : 'error',
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        setStatus({
          api: 'offline',
          upload: 'error',
          timestamp: new Date().toISOString(),
        });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'ready':
        return '#10b981';
      case 'offline':
      case 'error':
        return '#ef4444';
      default:
        return '#f59e0b';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'ready':
        return '✅';
      case 'offline':
      case 'error':
        return '❌';
      default:
        return '🔄';
    }
  };

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      marginBottom: '2rem',
    }}>
      <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>🔍 System Status</h3>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>{getStatusIcon(status.api)}</span>
          <span style={{ fontWeight: '600' }}>API Routes:</span>
          <span style={{ color: getStatusColor(status.api), fontWeight: '600' }}>
            {status.api.toUpperCase()}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>{getStatusIcon(status.upload)}</span>
          <span style={{ fontWeight: '600' }}>Upload Endpoint:</span>
          <span style={{ color: getStatusColor(status.upload), fontWeight: '600' }}>
            {status.upload.toUpperCase()}
          </span>
        </div>
        
        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
          Last checked: {new Date(status.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

// ====== ENVIRONMENT INFO COMPONENT ======
const EnvironmentInfo: React.FC = () => {
  const [envInfo, setEnvInfo] = useState<any>(null);

  useEffect(() => {
    const info = {
      nodeEnv: process.env.NODE_ENV,
      appName: process.env.NEXT_PUBLIC_APP_NAME,
      appVersion: process.env.NEXT_PUBLIC_APP_VERSION,
      apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
    setEnvInfo(info);
  }, []);

  if (!envInfo) return null;

  return (
    <details style={{
      padding: '1rem',
      backgroundColor: '#f1f5f9',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      marginBottom: '2rem',
    }}>
      <summary style={{ 
        cursor: 'pointer',
        fontWeight: '600',
        color: '#475569',
        marginBottom: '1rem',
      }}>
        🔧 Environment Information
      </summary>
      
      <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.875rem' }}>
        {Object.entries(envInfo).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontWeight: '600', minWidth: '120px', color: '#374151' }}>
              {key}:
            </span>
            <span style={{ color: '#64748b', wordBreak: 'break-all' }}>
              {String(value)}
            </span>
          </div>
        ))}
      </div>
    </details>
  );
};

// ====== QUICK ACTIONS COMPONENT ======
const QuickActions: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const testEndpoint = async (endpoint: string, method: string = 'GET') => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] Testing ${method} ${endpoint}...`;
    setLogs(prev => [logEntry, ...prev].slice(0, 5));

    try {
      const response = await fetch(endpoint, { method });
      const result = await response.json();
      const successLog = `[${timestamp}] ✅ ${endpoint} - ${response.status} ${response.statusText}`;
      setLogs(prev => [successLog, ...prev].slice(0, 5));
    } catch (error: any) {
      const errorLog = `[${timestamp}] ❌ ${endpoint} - ${error.message}`;
      setLogs(prev => [errorLog, ...prev].slice(0, 5));
    }
  };

  const clearLogs = () => setLogs([]);

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      marginBottom: '2rem',
    }}>
      <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>⚡ Quick Actions</h3>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button
          onClick={() => testEndpoint('/api/test')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Test API
        </button>
        
        <button
          onClick={() => testEndpoint('/api/email/upload', 'OPTIONS')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Test Upload
        </button>
        
        <button
          onClick={() => window.open('/api/test', '_blank')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Open API in New Tab
        </button>
        
        <button
          onClick={clearLogs}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Clear Logs
        </button>
      </div>
      
      {logs.length > 0 && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#f8fafc',
          borderRadius: '4px',
          border: '1px solid #e2e8f0',
        }}>
          <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            Recent Activity:
          </div>
          {logs.map((log, index) => (
            <div key={index} style={{ 
              fontSize: '0.75rem', 
              fontFamily: 'monospace',
              color: log.includes('✅') ? '#10b981' : log.includes('❌') ? '#ef4444' : '#64748b',
            }}>
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ====== MAIN PAGE COMPONENT ======
const TestUploadPage: NextPageWithLayout = () => {
  return (
    <>
      <DocumentTitle title="Upload Testing Suite - 404MOVERS" />
      
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '2rem 1rem',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* ====== PAGE HEADER ====== */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ 
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '1rem',
            }}>
              🧪 Upload Testing Suite
            </h1>
            <p style={{ 
              fontSize: '1.25rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}>
              Comprehensive testing environment for 404MOVERS email upload functionality
            </p>
          </div>

          {/* ====== SYSTEM STATUS ====== */}
          <SystemStatus />

          {/* ====== QUICK ACTIONS ====== */}
          <QuickActions />

          {/* ====== MAIN TEST COMPONENT ====== */}
          <EmailUploadTest />

          {/* ====== ENVIRONMENT INFO ====== */}
          <EnvironmentInfo />

          {/* ====== FOOTER INSTRUCTIONS ====== */}
          <div style={{
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
          }}>
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>📚 Documentation</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              This testing suite validates your email upload API endpoints. Use it during development 
              to ensure file uploads, email webhooks, and backend integration are working correctly.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f0f9ff',
                borderRadius: '6px',
                border: '1px solid #bae6fd',
                textAlign: 'center',
                minWidth: '150px',
              }}>
                <div style={{ fontWeight: '600', color: '#0369a1' }}>API Endpoints</div>
                <div style={{ fontSize: '0.875rem', color: '#0284c7' }}>
                  GET /api/test<br />
                  POST /api/email/upload
                </div>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: '#f0fdf4',
                borderRadius: '6px',
                border: '1px solid #bbf7d0',
                textAlign: 'center',
                minWidth: '150px',
              }}>
                <div style={{ fontWeight: '600', color: '#166534' }}>File Limits</div>
                <div style={{ fontSize: '0.875rem', color: '#15803d' }}>
                  Max 50MB per file<br />
                  Max 10 files total
                </div>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: '#fef7ff',
                borderRadius: '6px',
                border: '1px solid #e9d5ff',
                textAlign: 'center',
                minWidth: '150px',
              }}>
                <div style={{ fontWeight: '600', color: '#7c2d12' }}>Supported Types</div>
                <div style={{ fontSize: '0.875rem', color: '#92400e' }}>
                  PDF, DOC, DOCX<br />
                  JPG, PNG, GIF
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TestUploadPage.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default TestUploadPage;
