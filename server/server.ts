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

app.get("/company", async (req, res) => {
  try {
    const company = await pool.query(
      "SELECT email, id, company_name, creation_date FROM company;"
    );
    res.json(company.rows);
  } catch (err) {
    console.log(err);
  }
});

app.post("/company", async (req: Request, res: Response): Promise<void> => {
  const { email, company, password } = req.body;
  const id = uuidv4();
  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(password, salt);
  const creation_date = new Date();

  try {
    await pool.query(
      `INSERT INTO company(email, id, company_name, hashed_password, creation_date) VALUES($1, $2, $3, $4, $5)`,
      [email, id, company, hashed_password, creation_date]
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "24h" });

    res.json({ email, company, token });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, (): void => console.log(`Server running on PORT ${PORT}`));
