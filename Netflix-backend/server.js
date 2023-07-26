const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.port || 5000;
const userRoutes = require("./routes/UserRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect("mongodb://localhost:27017/")
// mongoose.connect("mongodb://0.0.0.0:27017/")
mongoose.connect("mongodb://127.0.0.1:27017/netflix-clone")
.then(() => {
    console.log("DB connected");
})
.catch((err) => {
    console.log("ERROR HERE");
    console.log(err);
});

app.use("/api/user", userRoutes);

app.listen(PORT, console.log("server started at "+ PORT));