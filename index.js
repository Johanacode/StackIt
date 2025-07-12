const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
const voteRoutes = require("./routes/votes");
const protectedRoutes = require("./routes/protected");
const notificationRoutes = require("./routes/notifications"); // ✅ Notifications route

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Route registrations
app.use("/api/auth", authRoutes);              // Register, login
app.use("/api/questions", questionRoutes);     // Ask, answer, search, stats
app.use("/api/votes", voteRoutes);             // Upvote/downvote
app.use("/api", protectedRoutes);              // Profile
app.use("/api/notifications", notificationRoutes); // Notifications

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
