import express, { Application } from "express";

const PORT = process.env.PORT || 8000;
const app: Application = express();

app.listen(PORT, (): void => console.log(`Server running on PORT ${PORT}`));
