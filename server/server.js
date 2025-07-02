import app from "./app.js";
import connectDB from "./config/db.js";
import path from "path";

const PORT = process.env.PORT || 5000;

connectDB(); 
const __dirname = path.resolve();



app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
