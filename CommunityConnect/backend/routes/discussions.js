// routes/discussions.js
import express from "express";
import Discussion from "../models/Discussion.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "✅ Discussions route working!" });
});

// Get all discussions
router.get("/", async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new discussion
router.post("/", async (req, res) => {
  try {
    const discussion = new Discussion(req.body);
    const savedDiscussion = await discussion.save();
    res.status(201).json(savedDiscussion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add reply to a discussion
router.post("/:id/replies", async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    discussion.replies.push(req.body);
    await discussion.save();
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a discussion
router.delete("/:id", async (req, res) => {
  try {
    console.log("🗑️ Deleting discussion with ID:", req.params.id);
    
    const deletedDiscussion = await Discussion.findByIdAndDelete(req.params.id);
    
    if (!deletedDiscussion) {
      console.log("❌ Discussion not found for deletion");
      return res.status(404).json({ message: "Discussion not found" });
    }
    
    console.log("✅ Discussion deleted successfully:", deletedDiscussion._id);
    res.json({ 
      message: "Discussion deleted successfully",
      deletedId: deletedDiscussion._id 
    });
    
  } catch (error) {
    console.error("❌ Error deleting discussion:", error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE a reply from a discussion
router.delete("/:discussionId/replies/:replyId", async (req, res) => {
  try {
    const { discussionId, replyId } = req.params;
    console.log("🗑️ Deleting reply:", { discussionId, replyId });
    
    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }
    
    // Find the reply and remove it
    const replyIndex = discussion.replies.findIndex(
      reply => reply._id.toString() === replyId
    );
    
    if (replyIndex === -1) {
      console.log("❌ Reply not found for deletion");
      return res.status(404).json({ message: "Reply not found" });
    }
    
    // Remove the reply from the array
    discussion.replies.splice(replyIndex, 1);
    await discussion.save();
    
    console.log("✅ Reply deleted successfully");
    res.json({ 
      message: "Reply deleted successfully",
      discussionId,
      replyId 
    });
    
  } catch (error) {
    console.error("❌ Error deleting reply:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router; 