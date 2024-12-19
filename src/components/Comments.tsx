import React, { useState } from "react";
import { Button, Card, Form, ListGroup, InputGroup } from "react-bootstrap";

interface Comment {
  id: number;
  author: string;
  content: string;
  replies: Comment[];
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [replyContent, setReplyContent] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleAddComment = () => {
    const newCommentObj: Comment = {
      id: Date.now(),
      author: "User",
      content: newComment,
      replies: [],
    };
    setComments((prevComments) => [...prevComments, newCommentObj]);
    setNewComment("");
  };

  const handleReply = (parentId: number) => {
    if (replyContent.trim()) {
      const updatedComments = comments.map((comment) => {
        if (comment.id === parentId) {
          comment.replies.push({
            id: Date.now(),
            author: "User",
            content: replyContent,
            replies: [],
          });
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  return (
    <div className="mt-4">
      <h2>Comments</h2>

      <Form>
        <InputGroup className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </InputGroup>
        <Button onClick={handleAddComment} disabled={!newComment}>
          Add Comment
        </Button>
      </Form>

      <ListGroup className="mt-4">
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <Card>
              <Card.Body>
                <Card.Title>{comment.author}</Card.Title>
                <Card.Text>{comment.content}</Card.Text>

                <Button
                  variant="link"
                  onClick={() => setReplyingTo(comment.id)}
                >
                  Reply
                </Button>

                {replyingTo === comment.id && (
                  <Form>
                    <InputGroup className="mt-3">
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                      />
                    </InputGroup>
                    <Button
                      variant="primary"
                      onClick={() => handleReply(comment.id)}
                      disabled={!replyContent}
                    >
                      Submit Reply
                    </Button>
                  </Form>
                )}

                {comment.replies.length > 0 && (
                  <ListGroup className="mt-3">
                    {comment.replies.map((reply) => (
                      <ListGroup.Item key={reply.id}>
                        <Card>
                          <Card.Body>
                            <Card.Title>{reply.author}</Card.Title>
                            <Card.Text>{reply.content}</Card.Text>
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Comments;