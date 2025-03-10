const express = require("express");
const app = express();
const moviesRoutes = require("./routers/movies");
const db = require("./data/db");
require("dotenv").config();

app.use(express.json());

// Rotte
app.use("/api/movies", moviesRoutes);

// Avvia il server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server in ascolto su http://localhost:${PORT}`);
});
