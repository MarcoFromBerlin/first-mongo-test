const express = require("express");

const app = express();

app.get("/", (req, res) => res.send({ msg: "welcome to the API" }));

// routes
app.use("/api/todolist", require("./routes/to-do-list"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
