const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();


const allowedOrigins = [
  "https://assesement5-ypuv.vercel.app/",
  "http://localhost:5173"
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(" Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true 
}));


app.use(express.json());

// ✅ Routes
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
  });
});
