// routes/notifications.js
const express = require("express");
const router = express.Router();
const { db } = require("../firebase");
const verifyFirebaseToken = require("../middleware/authMiddleware");

// ✅ GET /api/notifications → Get all notifications for current user
router.get("/", verifyFirebaseToken, async (req, res) => {
  const userId = req.user.uid;

  try {
    const snapshot = await db
      .collection("notifications")
      .doc(userId)
      .collection("items")
      .orderBy("createdAt", "desc")
      .get();

    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(notifications);
  } catch (err) {
    console.error("🔥 Error fetching notifications:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ PATCH /api/notifications/:notificationId/read → Mark as read
router.patch("/:notificationId/read", verifyFirebaseToken, async (req, res) => {
  const userId = req.user.uid;
  const { notificationId } = req.params;

  try {
    const notifRef = db
      .collection("notifications")
      .doc(userId)
      .collection("items")
      .doc(notificationId);

    const doc = await notifRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Notification not found" });
    }

    await notifRef.update({ read: true });
    res.status(200).json({ message: "Notification marked as read" });
  } catch (err) {
    console.error("🔥 Error updating notification:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
