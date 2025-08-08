// at top of file
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

console.log("DB cfg:", {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  pwd_set:
    typeof process.env.PGPASSWORD === "string" &&
    process.env.PGPASSWORD.length > 0,
});

const app = express();
app.use(cors());
app.use(express.json());

// uses PG* from .env (PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT)
const pool = new Pool();

// health check
app.get("/api/health", (_, res) => res.json({ ok: true }));

// *** THIS ENDPOINT queries your table ***
app.get("/api/employees", async (req, res) => {
  const { city, year, gender, limit = 50, offset = 0 } = req.query;

  // build WHERE safely
  const clauses = [];
  const params = [];

  if (city) {
    params.push(city);
    clauses.push(`LOWER(city) = LOWER($${params.length})`);
  }
  if (year) {
    params.push(Number(year));
    clauses.push(`joining_year = $${params.length}`);
  }
  if (gender) {
    params.push(gender);
    clauses.push(`LOWER(gender) = LOWER($${params.length})`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  // ⚠️ Use the RIGHT table name here.
  // If your table is all lowercase (most common), use:
  //   public.cb_employees_details
  // If it was created with UPPER/mixed case and quoted, you MUST quote it:
  //   "CB_employees_details"
  const TABLE = "CB_employees_details"; // change to "\"CB_employees_details\"" if your table is mixed-case & quoted

  const sql = `
    SELECT *
    FROM ${TABLE}
    ${where}
    ORDER BY name NULLS LAST
    LIMIT $${params.length + 1} OFFSET $${params.length + 2};
  `;
  params.push(Number(limit), Number(offset));

  try {
    const { rows } = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "query_failed" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}`)
);
