require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const app = express();

// Database setup
mongoose.connect("mongodb://localhost/starterDb", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

// Middlewares setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// If we are in production, serve our clients build folderuse
// This folder is created during production only
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Error Handling Goes Here
app.use(routes, (req, res) => {
    // No matching route for URL Found
    // res.sendFile(path.join(__dirname, "../client/build/404.html"));
    res.status(404).json({
        error: '404: Resource not found.'
    })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))