const express = require('express');
const path = require('path');
const app = express();

// Angular build output folder
const angularDistPath = path.join(__dirname, 'dist/hotel-management');

// Serve static files
app.use(express.static(angularDistPath));

// Fallback route for Angular routing
app.get('*', (req, res, next) => {
  // Ignore Render's internal URLs (e.g., https://git.new/...)
  if (req.path.startsWith('/_render') || req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(angularDistPath, 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Angular app running on port ${port}`);
});
