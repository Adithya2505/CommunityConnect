import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Discussions.css";

const Discussions = () => {
  const navigate = useNavigate();
  const [discussions, setDiscussions] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [currentUser] = useState("Current User");
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://localhost:5001/api/discussions";

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      console.log("🌐 Fetching discussions from:", BASE_URL);
      const response = await fetch(BASE_URL);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch (${response.status})`);
      }

      const data = await response.json();
      console.log("✅ Discussions received:", data);
      setDiscussions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error fetching discussions:", error);
      setDiscussions([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete discussion - UPDATED with better error handling
  const deleteDiscussion = async (discussionId) => {
    if (!window.confirm("Are you sure you want to delete this discussion? All replies will also be deleted.")) {
      return;
    }

    try {
      console.log("🗑️ Deleting discussion:", discussionId);
      const response = await fetch(`${BASE_URL}/${discussionId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log("Delete response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete discussion");
      }

      console.log("✅ Discussion deleted successfully");
      
      // Update UI immediately instead of refetching
      setDiscussions(prev => prev.filter(disc => disc._id !== discussionId));
      
    } catch (error) {
      console.error("❌ Error deleting discussion:", error);
      alert(`Failed to delete discussion: ${error.message}`);
    }
  };

  // Delete reply - UPDATED with better error handling
  const deleteReply = async (discussionId, replyId) => {
    if (!window.confirm("Are you sure you want to delete this reply?")) {
      return;
    }

    try {
      console.log("🗑️ Deleting reply:", { discussionId, replyId });
      const response = await fetch(`${BASE_URL}/${discussionId}/replies/${replyId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log("Delete reply response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete reply");
      }

      console.log("✅ Reply deleted successfully");
      
      // Update UI immediately
      setDiscussions(prev => prev.map(disc => {
        if (disc._id === discussionId) {
          return {
            ...disc,
            replies: disc.replies.filter(reply => reply._id !== replyId)
          };
        }
        return disc;
      }));
      
    } catch (error) {
      console.error("❌ Error deleting reply:", error);
      alert(`Failed to delete reply: ${error.message}`);
    }
  };

  // Rest of your functions (addNewTopic, addReply) remain the same...
  const addNewTopic = async () => {
    if (!newTopic.trim()) return;

    try {
      console.log("📝 Adding new topic:", newTopic);
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTopic,
          author: currentUser,
        }),
      });

      if (!response.ok) throw new Error("Failed to add new topic");

      console.log("✅ Topic added successfully");
      setNewTopic("");
      fetchDiscussions();
    } catch (error) {
      console.error("❌ Error adding discussion:", error);
    }
  };

  const addReply = async (discussionId) => {
    if (!replyText.trim()) return;

    try {
      const replyUrl = `${BASE_URL}/${discussionId}/replies`;
      console.log("💬 Adding reply to:", replyUrl);

      const response = await fetch(replyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: replyText,
          author: currentUser,
        }),
      });

      if (!response.ok) throw new Error("Failed to post reply");

      console.log("✅ Reply added successfully");
      setReplyText("");
      setReplyingTo(null);
      fetchDiscussions();
    } catch (error) {
      console.error("❌ Error adding reply:", error);
    }
  };

  const isAuthor = (author) => {
    return author === currentUser;
  };

  if (loading) {
    return <div className="loading">Loading discussions...</div>;
  }

  return (
    <div className="discussions-container">
      <div className="discussions-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
        <h1>💬 Community Discussions</h1>
      </div>

      {/* Add New Topic */}
      <div className="new-topic-section">
        <input
          type="text"
          placeholder="Start a new discussion topic..."
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          className="topic-input"
          onKeyDown={(e) => e.key === "Enter" && addNewTopic()}
        />
        <button onClick={addNewTopic} className="add-topic-btn">
          + Add Topic
        </button>
      </div>

      {/* Debug Info */}
      <div style={{ padding: '10px', background: '#f5f5f5', marginBottom: '20px', borderRadius: '5px' }}>
        <small>Debug: {discussions.length} discussions loaded | User: {currentUser}</small>
      </div>

      {/* Discussions List */}
      <div className="discussions-list">
        {discussions.length === 0 ? (
          <div className="no-discussions">
            <p>No discussions yet. Start the first one!</p>
          </div>
        ) : (
          discussions.map((discussion) => (
            <div key={discussion._id} className="discussion-card">
              <div className="discussion-header">
                <div className="discussion-title-section">
                  <h3>{discussion.title}</h3>
                  {isAuthor(discussion.author) && (
                    <button
                      onClick={() => deleteDiscussion(discussion._id)}
                      className="delete-discussion-btn"
                      title="Delete Discussion"
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
                <div className="discussion-meta">
                  <span className="discussion-author">by {discussion.author}</span>
                  <span className="reply-count">
                    💬 {discussion.replies ? discussion.replies.length : 0} replies
                  </span>
                </div>
              </div>

              {/* Replies */}
              <div className="replies-section">
                <h4>Replies:</h4>
                {discussion.replies && discussion.replies.length > 0 ? (
                  discussion.replies.map((reply, index) => (
                    <div key={reply._id || index} className="reply-item">
                      <div className="reply-header">
                        <p className="reply-text">{reply.text}</p>
                        {isAuthor(reply.author) && (
                          <button
                            onClick={() => deleteReply(discussion._id, reply._id)}
                            className="delete-reply-btn"
                            title="Delete Reply"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <div className="reply-meta">
                        <span className="reply-author">- {reply.author}</span>
                        <span className="reply-date">
                          {reply.date
                            ? new Date(reply.date).toLocaleDateString()
                            : "Recent"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-replies">No replies yet. Be the first to reply!</p>
                )}
              </div>

              {/* Reply input */}
              <div className="reply-section">
                {replyingTo === discussion._id ? (
                  <div className="reply-input-group">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply..."
                      rows="3"
                    />
                    <div className="reply-actions">
                      <button
                        onClick={() => addReply(discussion._id)}
                        className="submit-reply-btn"
                      >
                        Submit Reply
                      </button>
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="cancel-reply-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setReplyingTo(discussion._id)}
                    className="add-reply-btn"
                  >
                    💬 Add Reply
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Discussions;