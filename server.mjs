import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files with html extensions support
app.use(express.static(__dirname, {
  extensions: ['html', 'htm']
}));

// Fallback to 404.html for non-existent routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'), (err) => {
    if (err) {
      res.status(404).send('404 Not Found');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
