import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;

// Starting the backend server
app.listen(port, () => {
    console.log(`Backend Server is running on http://localhost:${port}`);
});