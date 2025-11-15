#!/usr/bin/env node
/**
 * Local test server for AIMastery Cymatic Analyzer V4
 * Tests API endpoints without requiring Vercel authentication
 */

const http = require('http');
const url = require('url');

// Set development environment
process.env.NODE_ENV = 'development';

// Mock environment variables for testing (without real API keys)
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'mock-key';
process.env.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_mock';
process.env.WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'whsec_mock';

// Import API handlers
const analyzeHandler = require('./api/analyze.js');
const createCheckoutHandler = require('./api/create-checkout.js');
const webhookHandler = require('./api/webhook.js');

const PORT = process.env.PORT || 3000;

// Create mock request/response objects compatible with Vercel
function createMockReq(req) {
  let body = '';

  return new Promise((resolve) => {
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const parsedUrl = url.parse(req.url, true);
      const mockReq = {
        method: req.method,
        url: req.url,
        headers: req.headers || {},
        query: parsedUrl.query,
        body: body ? JSON.parse(body) : {},
        on: req.on.bind(req)
      };
      resolve(mockReq);
    });
  });
}

function createMockRes(res) {
  const mockRes = {
    statusCode: 200,
    headers: {},
    setHeader: (key, value) => {
      mockRes.headers[key] = value;
      res.setHeader(key, value);
    },
    status: (code) => {
      mockRes.statusCode = code;
      res.statusCode = code;
      return mockRes;
    },
    json: (data) => {
      mockRes.setHeader('Content-Type', 'application/json');
      res.statusCode = mockRes.statusCode;
      res.end(JSON.stringify(data, null, 2));
      return mockRes;
    },
    send: (data) => {
      res.statusCode = mockRes.statusCode;
      res.end(data);
      return mockRes;
    },
    end: (data) => {
      res.end(data || '');
      return mockRes;
    }
  };
  return mockRes;
}

// Create server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  console.log(`${new Date().toISOString()} - ${req.method} ${pathname}`);

  try {
    // Serve static files
    if (pathname === '/' || pathname === '/index.html') {
      const fs = require('fs');
      const indexPath = './public/index.html';
      const html = fs.readFileSync(indexPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }

    if (pathname === '/success.html') {
      const fs = require('fs');
      const html = fs.readFileSync('./public/success.html', 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }

    if (pathname === '/cancel.html') {
      const fs = require('fs');
      const html = fs.readFileSync('./public/cancel.html', 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }

    // API routes
    if (pathname === '/api/analyze') {
      const mockReq = await createMockReq(req);
      const mockRes = createMockRes(res);
      await analyzeHandler(mockReq, mockRes);
      return;
    }

    if (pathname === '/api/create-checkout') {
      const mockReq = await createMockReq(req);
      const mockRes = createMockRes(res);
      await createCheckoutHandler(mockReq, mockRes);
      return;
    }

    if (pathname === '/api/webhook') {
      const mockReq = await createMockReq(req);
      const mockRes = createMockRes(res);
      await webhookHandler(mockReq, mockRes);
      return;
    }

    // 404 for other routes
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found', path: pathname }));

  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error', details: error.message }));
  }
});

server.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 AIMastery Cymatic Analyzer V4 - Local Test Server');
  console.log('='.repeat(60));
  console.log(`\n📡 Server running at: http://localhost:${PORT}`);
  console.log(`\n📄 Pages:`);
  console.log(`   - Landing:  http://localhost:${PORT}/`);
  console.log(`   - Success:  http://localhost:${PORT}/success.html`);
  console.log(`   - Cancel:   http://localhost:${PORT}/cancel.html`);
  console.log(`\n🔧 API Endpoints:`);
  console.log(`   - POST http://localhost:${PORT}/api/analyze`);
  console.log(`   - POST http://localhost:${PORT}/api/create-checkout`);
  console.log(`   - POST http://localhost:${PORT}/api/webhook`);
  console.log(`\n⚠️  Note: Using mock API keys (OpenAI will not work)`);
  console.log(`   Set real keys in environment variables for full testing\n`);
  console.log('='.repeat(60) + '\n');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
