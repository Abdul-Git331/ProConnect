require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");
const workerRoute = require("./routes/workRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();

app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,              
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRoute);
app.use("/", workerRoute);
app.use("/", adminRoute)
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
