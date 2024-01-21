import express, { Application } from "express";
import cors from "cors";

import { companyRoutes } from "./routes/company";

const PORT = process.env.PORT || 8000;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/company", companyRoutes);
app.use("/company/login", companyRoutes);

app.listen(PORT, (): void => console.log(`Server running on PORT ${PORT}`));
