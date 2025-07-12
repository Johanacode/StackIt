const express = require("express");
const router = express.Router();
const { db } = require("../firebase");
const verifyFirebaseToken = require("../middleware/authMiddleware");

// Helper function
const handleVote = async (req, res, type, voteValue) => {
  const { id } = req.params;
  const userId = req.user.uid;
  const voteDocId = `${type}_${id}`; // e.g. question_q123

  try {
    const voteRef = db.collection("votes").doc(voteDocId);
    const voteDoc = await voteRef.get();

    let data = {
      voters: { [userId]: voteValue },
      total: voteValue,
    };

    if (voteDoc.exists) {
      const current = voteDoc.data();
      const previousVote = current.voters?.[userId] || 0;
      current.voters[userId] = voteValue;
      const newTotal = current.total - previousVote + voteValue;
      data = {
        voters: current.voters,
        total: newTotal,
      };
    }

    await voteRef.set(data);
    res.status(200).json({ message: `${voteValue === 1 ? "Upvoted" : "Downvoted"}`, total: data.total });
  } catch (err) {
    console.error("🔥 Vote error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Vote for a question
router.post("/questions/:id/upvote", verifyFirebaseToken, (req, res) => handleVote(req, res, "question", 1));
router.post("/questions/:id/downvote", verifyFirebaseToken, (req, res) => handleVote(req, res, "question", -1));

// Vote for an answer
router.post("/answers/:id/upvote", verifyFirebaseToken, (req, res) => handleVote(req, res, "answer", 1));
router.post("/answers/:id/downvote", verifyFirebaseToken, (req, res) => handleVote(req, res, "answer", -1));

module.exports = router;
