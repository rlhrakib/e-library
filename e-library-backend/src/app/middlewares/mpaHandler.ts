import { Request, Response, NextFunction } from 'express';
import path from 'path';

export const mpaHandler = (req: Request, res: Response, next: NextFunction) => {
  const isMPA = req.headers['x-app-mode'] === 'MPA' || req.query.mode === 'MPA';
  
  if (isMPA && req.method === 'GET') {
    // For MPA requests, serve HTML pages instead of JSON
    const route = req.path.replace('/api/v1', '');
    
    switch (route) {
      case '/':
      case '/books':
      case '/about':
      case '/contact':
        return res.send(generateMPAPage(route, req));
      default:
        break;
    }
  }
  
  next();
};

const generateMPAPage = (route: string, req: Request) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Library - ${route.replace('/', '') || 'Home'}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { border-bottom: 1px solid #ccc; padding-bottom: 20px; margin-bottom: 20px; }
        .nav { display: flex; gap: 20px; margin-top: 10px; }
        .nav a { text-decoration: none; color: #007bff; }
        .mode-toggle { float: right; }
        .content { min-height: 400px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>E-Library</h1>
            <button class="mode-toggle" onclick="toggleMode()">Switch to SPA</button>
            <div class="nav">
                <a href="/">Home</a>
                <a href="/books">Books</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div>
        </div>
        <div class="content">
            ${getPageContent(route)}
        </div>
    </div>
    <script>
        function toggleMode() {
            localStorage.setItem('appMode', 'SPA');
            window.location.href = '${baseUrl}';
        }
    </script>
</body>
</html>`;
};

const getPageContent = (route: string) => {
  switch (route) {
    case '/':
      return '<h2>Welcome to E-Library</h2><p>Browse our collection of digital books.</p>';
    case '/books':
      return '<h2>All Books</h2><p>Loading books...</p><div id="books-list"></div>';
    case '/about':
      return '<h2>About Us</h2><p>E-Library is a digital platform for book lovers.</p>';
    case '/contact':
      return '<h2>Contact Us</h2><p>Get in touch with our team.</p>';
    default:
      return '<h2>Page Not Found</h2>';
  }
};
