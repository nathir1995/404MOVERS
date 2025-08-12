import React, { useState, useCallback } from 'react';
import { safeMap, hasItems } from '@/utility/arraySafety';

// ====== MAIN COMPONENT ======
const EmailUploadTest: React.FC = () => {
  // ====== STATE ======
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [testMode, setTestMode] = useState<'basic' | 'upload' | 'webhook'>('basic');

  // ====== UTILITY FUNCTIONS ======
  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  const addResult = useCallback((result: any) => {
    setResults(prev => [result, ...prev].slice(0, 10)); // Keep last 10 results
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // ====== FILE HANDLING ======
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    clearResults();
  }, [clearResults]);

  const validateFiles = useCallback((fileList: FileList): string | null => {
    const allowedTypes = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif'];
    const maxSize = 50 * 1024 * 1024; // 50MB
    const maxFiles = 10;

    if (fileList.length > maxFiles) {
      return `Too many files. Maximum ${maxFiles} files allowed.`;
    }

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const extension = file.name.split('.').pop()?.toLowerCase();
      
      if (!extension || !allowedTypes.includes(extension)) {
        return `Invalid file type: ${file.name}. Allowed: ${allowedTypes.join(', ')}`;
      }
      
      if (file.size > maxSize) {
        return `File too large: ${file.name} (${formatFileSize(file.size)}). Max: 50MB`;
      }
    }

    return null;
  }, []);

  // ====== API TEST FUNCTIONS ======
  const testBasicAPI = async () => {
    setUploading(true);
    setError(null);
    const startTime = Date.now();

    try {
      console.log('🧪 Testing basic API endpoint...');
      
      const response = await fetch('/api/test', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      const data = await response.json();
      const duration = Date.now() - startTime;

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      addResult({
        success: true,
        message: '✅ Basic API test successful',
        data,
        timestamp: new Date().toISOString(),
        duration,
      });

    } catch (err: any) {
      const duration = Date.now() - startTime;
      console.error('❌ Basic API test failed:', err);
      
      addResult({
        success: false,
        message: '❌ Basic API test failed',
        error: err.message,
        timestamp: new Date().toISOString(),
        duration,
      });
    } finally {
      setUploading(false);
    }
  };

  const testFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!files || files.length === 0) {
      setError('Please select files to upload');
      return;
    }

    const validationError = validateFiles(files);
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);
    setError(null);
    const startTime = Date.now();

    try {
      console.log(`📤 Uploading ${files.length} files to /api/upload...`);
      
      const formData = new FormData();
      
      // Add files
      for (let i = 0; i < files.length; i++) {
        formData.append(`file_${i}`, files[i]);
      }
      
      // Add metadata
      formData.append('source', 'upload_test_component');
      formData.append('timestamp', new Date().toISOString());

      const response = await fetch('/api/upload', {  // ✅ CORRECTED: Using /api/upload
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const duration = Date.now() - startTime;

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      console.log('✅ Upload successful:', data);
      addResult({
        success: true,
        message: `✅ Upload successful - ${data.data?.filesProcessed || 0} files processed`,
        data,
        requestId: data.requestId,
        timestamp: new Date().toISOString(),
        duration,
      });
      
    } catch (err: any) {
      const duration = Date.now() - startTime;
      console.error('❌ Upload failed:', err);
      
      addResult({
        success: false,
        message: '❌ File upload failed',
        error: err.message,
        timestamp: new Date().toISOString(),
        duration,
      });
    } finally {
      setUploading(false);
    }
  };

  const testWebhookSimulation = async () => {
    setUploading(true);
    setError(null);
    const startTime = Date.now();

    try {
      console.log('🔗 Testing webhook simulation...');
      
      const formData = new FormData();
      
      // Simulate email webhook data
      formData.append('source', 'email_webhook_simulation');
      formData.append('from', 'customer@example.com');
      formData.append('to', 'uploads@404movers.ca');
      formData.append('subject', 'Move Documents Upload');
      formData.append('timestamp', new Date().toISOString());
      
      // Create a small test file for the simulation
      const testContent = 'This is a simulated document attachment from email webhook.';
      const testFile = new Blob([testContent], { type: 'text/plain' });
      formData.append('attachment_1', testFile, 'webhook_simulation.txt');

      const response = await fetch('/api/upload', {  // ✅ CORRECTED: Using /api/upload
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const duration = Date.now() - startTime;

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      addResult({
        success: true,
        message: '✅ Webhook simulation successful',
        data,
        requestId: data.requestId,
        timestamp: new Date().toISOString(),
        duration,
      });

    } catch (err: any) {
      const duration = Date.now() - startTime;
      console.error('❌ Webhook simulation failed:', err);
      
      addResult({
        success: false,
        message: '❌ Webhook simulation failed',
        error: err.message,
        timestamp: new Date().toISOString(),
        duration,
      });
    } finally {
      setUploading(false);
    }
  };

  // ====== RENDER ======
  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
    }}>
      {/* ====== HEADER ====== */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ 
          color: '#1e293b', 
          marginBottom: '0.5rem',
          fontSize: '1.875rem',
          fontWeight: '700',
        }}>
          📧 404MOVERS Upload Testing Suite
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          Test your upload API at <code>/api/upload</code>
        </p>
      </div>

      {/* ====== TEST MODE SELECTOR ====== */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {safeMap([
          { key: 'basic', label: '🔧 Basic API', desc: 'Test connectivity' },
          { key: 'upload', label: '📁 File Upload', desc: 'Upload files' },
          { key: 'webhook', label: '🔗 Webhook Simulation', desc: 'Simulate email' },
        ], ({ key, label, desc }) => (
          <button
            key={key}
            onClick={() => setTestMode(key as any)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: '2px solid',
              borderColor: testMode === key ? '#3b82f6' : '#e2e8f0',
              backgroundColor: testMode === key ? '#3b82f6' : 'white',
              color: testMode === key ? 'white' : '#64748b',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'all 0.2s',
              textAlign: 'center',
            }}
          >
            <div>{label}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{desc}</div>
          </button>
        ))}
      </div>

      {/* ====== BASIC API TEST ====== */}
      {testMode === 'basic' && (
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem',
        }}>
          <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>🔧 Basic API Connectivity Test</h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            Test if the API routes are properly configured and responding.
          </p>
          <button 
            onClick={testBasicAPI}
            disabled={uploading}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: uploading ? '#94a3b8' : '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'background-color 0.2s',
            }}
          >
            {uploading ? '🔄 Testing...' : '🚀 Test API Connection'}
          </button>
        </div>
      )}

      {/* ====== FILE UPLOAD TEST ====== */}
      {testMode === 'upload' && (
        <form onSubmit={testFileUpload} style={{ 
          padding: '1.5rem', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem',
        }}>
          <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>📁 File Upload Test</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#374151',
              fontWeight: '600',
            }}>
              Select Files (Max 10 files, 50MB each)
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px dashed #d1d5db',
                borderRadius: '6px',
                backgroundColor: '#f9fafb',
                cursor: 'pointer',
              }}
            />
            {files && files.length > 0 && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                Selected: {files.length} file{files.length !== 1 ? 's' : ''} 
                ({formatFileSize(Array.from(files).reduce((sum, file) => sum + file.size, 0))})
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={uploading || !files || files.length === 0}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: uploading ? '#94a3b8' : '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: (uploading || !files || files.length === 0) ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'background-color 0.2s',
            }}
          >
            {uploading ? '📤 Uploading...' : '📤 Upload Files'}
          </button>
        </form>
      )}

      {/* ====== WEBHOOK SIMULATION ====== */}
      {testMode === 'webhook' && (
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem',
        }}>
          <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>🔗 Webhook Simulation</h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            Simulate an email service webhook sending data to your upload API.
          </p>
          <button 
            onClick={testWebhookSimulation}
            disabled={uploading}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: uploading ? '#94a3b8' : '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'background-color 0.2s',
            }}
          >
            {uploading ? '📧 Testing...' : '📧 Simulate Webhook'}
          </button>
        </div>
      )}

      {/* ====== CURRENT ERROR ====== */}
      {error && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#fef2f2', 
          color: '#dc2626',
          borderRadius: '8px',
          border: '1px solid #fecaca',
          marginBottom: '2rem',
        }}>
          <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>❌ Error</div>
          <div>{error}</div>
        </div>
      )}

      {/* ====== RESULTS ====== */}
      {results.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1rem',
          }}>
            <h3 style={{ color: '#1e293b', margin: 0 }}>📊 Test Results</h3>
            <button
              onClick={clearResults}
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
              Clear Results
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {safeMap(results, (result, index) => (
              <div
                key={index}
                style={{
                  padding: '1rem',
                  backgroundColor: result.success ? '#f0fdf4' : '#fef2f2',
                  borderRadius: '8px',
                  border: `1px solid ${result.success ? '#bbf7d0' : '#fecaca'}`,
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem',
                }}>
                  <div style={{ 
                    fontWeight: '600',
                    color: result.success ? '#166534' : '#dc2626',
                  }}>
                    {result.message}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    textAlign: 'right',
                  }}>
                    <div>{new Date(result.timestamp).toLocaleTimeString()}</div>
                    {result.duration && <div>{result.duration}ms</div>}
                    {result.requestId && <div>ID: {result.requestId.substring(0, 8)}</div>}
                  </div>
                </div>
                
                {result.error && (
                  <div style={{ 
                    fontSize: '0.875rem',
                    color: '#dc2626',
                    marginBottom: '0.5rem',
                  }}>
                    {result.error}
                  </div>
                )}
                
                {result.data && (
                  <details style={{ marginTop: '0.5rem' }}>
                    <summary style={{ 
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: '#6b7280',
                    }}>
                      View Response Data
                    </summary>
                    <pre style={{ 
                      fontSize: '0.75rem',
                      backgroundColor: '#f8fafc',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      overflow: 'auto',
                      marginTop: '0.5rem',
                      border: '1px solid #e2e8f0',
                    }}>
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====== INSTRUCTIONS ====== */}
      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: '#fffbeb',
        borderRadius: '8px',
        border: '1px solid #fed7aa',
      }}>
        <h4 style={{ color: '#92400e', marginBottom: '1rem' }}>📋 API Endpoints</h4>
        <div style={{ color: '#92400e', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <div><strong>GET /api/test</strong> - Basic API connectivity test</div>
          <div><strong>POST /api/upload</strong> - File upload endpoint (fixes 405 error)</div>
          <div><strong>Uploads Directory:</strong> <code>uploads/</code></div>
          <div><strong>Max File Size:</strong> 50MB per file</div>
          <div><strong>Allowed Types:</strong> PDF, DOC, DOCX, JPG, JPEG, PNG, GIF</div>
        </div>
      </div>
    </div>
  );
};

export default EmailUploadTest;
