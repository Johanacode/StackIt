const express = require("express");
const router = express.Router();
const { auth, db } = require("../firebase");

// ✅ REGISTER route (already done)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await auth.createUser({ email, password });

    await db.collection("users").doc(userRecord.uid).set({
      email: userRecord.email,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "User registered", uid: userRecord.uid });
  } catch (error) {
    console.error("🔥 Register Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ LOGIN token verification route
router.post("/login", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Optionally fetch user details from Firestore
    const userDoc = await db.collection("users").doc(uid).get();

    res.status(200).json({
      message: "Login verified",
      uid,
      email: decodedToken.email,
      user: userDoc.exists ? userDoc.data() : null,
    });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

module.exports = router;
