import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Same URL rules as vercel.json / .htaccess: "/about/" → "/about", each
  // route serves its prerendered HTML, and unknown paths get a real 404.
  app.get(["/about", "/sustainable-supply"], (req, res, next) => {
    // Express matches with or without the slash, so check the real path.
    if (req.path.endsWith("/")) res.redirect(301, req.path.slice(0, -1));
    else next();
  });
  app.use(express.static(staticPath, { redirect: false }));
  app.get(["/about", "/sustainable-supply"], (req, res) => {
    res.sendFile(path.join(staticPath, req.path, "index.html"));
  });

  app.use((_req, res) => {
    res.status(404).sendFile(path.join(staticPath, "404.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
