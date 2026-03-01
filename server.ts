import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("expenses.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/transactions", (req: express.Request, res: express.Response) => {
    const transactions = db.prepare("SELECT * FROM transactions ORDER BY date DESC, id DESC").all();
    res.json(transactions);
  });

  app.post("/api/transactions", (req: express.Request, res: express.Response) => {
    const { description, amount, type, category, date } = req.body;
    const info = db.prepare(
      "INSERT INTO transactions (description, amount, type, category, date) VALUES (?, ?, ?, ?, ?)"
    ).run(description, amount, type, category, date);
    
    const newTransaction = db.prepare("SELECT * FROM transactions WHERE id = ?").get(info.lastInsertRowid);
    res.status(201).json(newTransaction);
  });

  app.delete("/api/transactions/:id", (req: express.Request, res: express.Response) => {
    db.prepare("DELETE FROM transactions WHERE id = ?").run(req.params.id);
    res.status(204).end();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
