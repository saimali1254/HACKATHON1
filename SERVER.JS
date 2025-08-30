const express = require("express");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// In-memory mock data (you can later connect to APIs)
const SCHEMES = [
  { name: "Pradhan Mantri Awas Yojana", category: "Housing", state: "All India", description: "Affordable housing scheme for all." },
  { name: "Ayushman Bharat", category: "Health", state: "All India", description: "Health insurance up to 5 lakhs for poor families." },
  { name: "Startup India", category: "Business", state: "All India", description: "Support and funding for startups." }
];

// API endpoint
app.get("/api/schemes", (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : "";
  const results = SCHEMES.filter(s => 
    s.name.toLowerCase().includes(query) ||
    s.description.toLowerCase().includes(query) ||
    s.category.toLowerCase().includes(query)
  );
  res.json(results);
});

// Health check
app.get("/health", (req, res) => res.send("Civiora is running ✅"));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
