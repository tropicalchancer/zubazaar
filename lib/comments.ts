// Define comment type
export interface Comment {
  id: string
  author: string
  content: string
  timestamp: Date
}

// Mock comments data - in a real app this would come from a database
const commentsData: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      author: "Sarah Johnson",
      content: "This is such a clever idea! I've been looking for something like this for ages.",
      timestamp: new Date(2025, 3, 19, 14, 30),
    },
    {
      id: "c2",
      author: "Michael Chen",
      content: "I've been using this for a week now and it's completely changed my workflow. Highly recommend!",
      timestamp: new Date(2025, 3, 19, 16, 45),
    },
  ],
  "2": [
    {
      id: "c3",
      author: "Alex Rivera",
      content: "The build quality is exceptional. Worth every penny!",
      timestamp: new Date(2025, 3, 18, 9, 15),
    },
  ],
}

// Function to get comments for a specific product
export function getCommentsForProduct(productId: string): Comment[] {
  return commentsData[productId] || []
}

// Function to add a comment to a product
export function addCommentToProduct(productId: string, comment: Omit<Comment, "id">): Comment {
  const newComment = {
    id: `c${Date.now()}`,
    ...comment,
  }

  if (!commentsData[productId]) {
    commentsData[productId] = []
  }

  commentsData[productId].push(newComment)
  return newComment
}
