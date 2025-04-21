"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow } from "date-fns"
import { getCommentsForProduct, addCommentToProduct, type Comment } from "@/lib/comments"

export function CommentSection({ productId }: { productId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")

  // Load comments when component mounts or productId changes
  useEffect(() => {
    setComments(getCommentsForProduct(productId))
  }, [productId])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim()) return

    const comment = addCommentToProduct(productId, {
      author: "Anonymous User", // Since we're not implementing auth
      content: newComment,
      timestamp: new Date(),
    })

    setComments([...comments, comment])
    setNewComment("")
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Comments ({comments.length})</h2>

      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex flex-col gap-2">
          <Textarea
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 self-end" disabled={!newComment.trim()}>
            Post Comment
          </Button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{comment.author}</span>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  )
}
