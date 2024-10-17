require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const limiter = require("./src/middleware/rateLimiter");
const morgan = require("morgan");

const connectDatabase = require("./src/config/db");
const appRouters = require("./src/app");

const app = express();

connectDatabase();

app.use(helmet());
app.use(morgan("combined"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(limiter);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "App is running..." });
});

app.use("/api", appRouters);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
