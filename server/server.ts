import express, { Request, Response, Application } from "express";
import pool from "./db";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const PORT = process.env.PORT || 8000;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/company", async (req: Request, res: Response): Promise<void> => {
  try {
    const company = await pool.query(
      "SELECT email, id, company_name, creation_date FROM company;"
    );
    res.json(company.rows);
  } catch (err) {
    console.log(err);
  }
});

//sign up
app.post("/company", async (req: Request, res: Response): Promise<void> => {
  const { email, company, password } = req.body;

  if (!email || !company || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const id = uuidv4();
  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(password, salt);
  const creation_date = new Date();

  try {
    await pool.query(
      `INSERT INTO company(email, id, company_name, hashed_password, creation_date) VALUES($1, $2, $3, $4, $5)`,
      [email, id, company, hashed_password, creation_date]
    );

    res.status(201).json({ email, company });
  } catch (err: any) {
    console.log(err);
    if (err.code === "23505") {
      res.status(409).json({ error: "The company already exists" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

//log in
app.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const response = await pool.query(
      "SELECT * FROM company WHERE email = $1",
      [email]
    );

    if (!response.rows.length) {
      res.status(404).json({ error: "The user doesn't exist" });
      return;
    }

    const passwordComparison = await bcrypt.compare(
      password,
      response.rows[0].hashed_password
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "24h" });

    if (passwordComparison) {
      res.status(200).json({ email: response.rows[0].email, token });
    } else {
      res.status(403).json({ error: "Password not valid" });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, (): void => console.log(`Server running on PORT ${PORT}`));
