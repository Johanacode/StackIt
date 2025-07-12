// routes/questions.js
const express = require("express");
const router = express.Router();
const { db } = require("../firebase");
const verifyFirebaseToken = require("../middleware/authMiddleware");

// ✅ GET /api/questions → Get all questions
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("questions").orderBy("createdAt", "desc").get();
    const questions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json(questions);
  } catch (err) {
    console.error("🔥 Error fetching questions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ POST /api/questions → Ask a question (with tag validation)
router.post("/", verifyFirebaseToken, async (req, res) => {
  const { title, body, tags } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }

  if (!Array.isArray(tags) || tags.length === 0) {
    return res.status(400).json({ error: "At least one tag is required" });
  }

  try {
    const questionRef = await db.collection("questions").add({
      title,
      body,
      tags,
      createdBy: req.user.uid,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Question posted", id: questionRef.id });
  } catch (err) {
    console.error("🔥 Error posting question:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ POST /api/questions/:id/answers → Answer a question + notify question author
router.post("/:id/answers", verifyFirebaseToken, async (req, res) => {
  const { body } = req.body;
  const questionId = req.params.id;

  if (!body) return res.status(400).json({ error: "Answer body is required" });

  try {
    const questionDoc = await db.collection("questions").doc(questionId).get();
    if (!questionDoc.exists) {
      return res.status(404).json({ error: "Question not found" });
    }

    const answerRef = await db
      .collection("questions")
      .doc(questionId)
      .collection("answers")
      .add({
        body,
        answeredBy: req.user.uid,
        createdAt: new Date(),
      });

    // 🔔 Create notification for question owner
    const questionData = questionDoc.data();
    if (questionData.createdBy !== req.user.uid) {
      await db
        .collection("notifications")
        .doc(questionData.createdBy)
        .collection("items")
        .add({
          type: "new_answer",
          questionId,
          answeredBy: req.user.uid,
          createdAt: new Date(),
          read: false
        });
    }

    res.status(201).json({ message: "Answer posted", id: answerRef.id });
  } catch (err) {
    console.error("🔥 Error posting answer:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET /api/questions/:id/answers → Get all answers
router.get("/:id/answers", async (req, res) => {
  const questionId = req.params.id;

  try {
    const snapshot = await db
      .collection("questions")
      .doc(questionId)
      .collection("answers")
      .orderBy("createdAt", "desc")
      .get();

    const answers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(answers);
  } catch (err) {
    console.error("🔥 Error fetching answers:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET /api/questions/search?query=term → Search questions
router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) return res.status(400).json({ error: "Search query required" });

  try {
    const snapshot = await db.collection("questions").get();
    const results = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(q =>
        q.title.toLowerCase().includes(query.toLowerCase()) ||
        q.body.toLowerCase().includes(query.toLowerCase())
      );

    res.status(200).json(results);
  } catch (err) {
    console.error("🔥 Error searching questions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET /api/questions/:id/stats → Count answers + votes
router.get("/:id/stats", async (req, res) => {
  const questionId = req.params.id;

  try {
    const answersSnap = await db
      .collection("questions")
      .doc(questionId)
      .collection("answers")
      .get();

    const votesSnap = await db
      .collection("votes")
      .where("itemId", "==", `question_${questionId}`)
      .get();

    res.status(200).json({
      answerCount: answersSnap.size,
      voteCount: votesSnap.size,
    });
  } catch (err) {
    console.error("🔥 Error getting stats:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ EXPORT
module.exports = router;
