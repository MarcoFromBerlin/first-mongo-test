const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect DB
connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send({ msg: "welcome to the API" }));

// routes
app.use("/api/todolist", require("./routes/to-do-list"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
