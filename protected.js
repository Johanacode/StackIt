// routes/protected.js
const express = require("express");
const router = express.Router();
const { auth } = require("../firebase");
const verifyFirebaseToken = require("../middleware/authMiddleware");

// GET /api/profile
router.get("/profile", verifyFirebaseToken, async (req, res) => {
  try {
    const userRecord = await auth.getUser(req.user.uid);
    res.status(200).json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName || null,
      photoURL: userRecord.photoURL || null,
    });
  } catch (err) {
    console.error("🔥 Error fetching user profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
