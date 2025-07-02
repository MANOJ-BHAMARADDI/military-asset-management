import app from "./app.js";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";



const PORT = process.env.PORT || 5000;

connectDB(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientPath = path.resolve(__dirname, "../client/dist");
app.use(express.static(clientPath));

app.get("*", (req, res) => res.sendFile(path.join(clientPath, "index.html")));



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
