"use client"

import type React from "react"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronUp, MessageSquare } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  id: string
  name: string
  description: string
  upvotes: number
  comments: number
  maker?: boolean
  submittedAt?: Date
}

export function ProductCard({
  id,
  name,
  description,
  upvotes: initialUpvotes,
  comments,
  maker = false,
  submittedAt,
}: ProductCardProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const router = useRouter()

  const handleUpvote = (e: React.MouseEvent) => {
    // Stop propagation to prevent card click
    e.stopPropagation()

    if (hasUpvoted) {
      setUpvotes(upvotes - 1)
      setHasUpvoted(false)
    } else {
      setUpvotes(upvotes + 1)
      setHasUpvoted(true)
    }
  }

  const handleCommentClick = (e: React.MouseEvent) => {
    // Stop propagation to prevent card click
    e.stopPropagation()
  }

  const handleCardClick = () => {
    router.push(`/products/${id}`)
  }

  // Format the submission date
  const formattedDate = submittedAt ? format(submittedAt, "MMMM d") : ""

  return (
    <div
      className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col items-center gap-1 min-w-[60px]">
        <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={handleUpvote}>
          <ChevronUp className={`h-6 w-6 ${hasUpvoted ? "text-orange-500 fill-orange-500" : "text-gray-500"}`} />
          <span className="sr-only">Upvote</span>
        </Button>
        <span className="text-sm font-medium text-gray-700">{upvotes}</span>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-orange-500">
              {name}
              {maker && <Badge className="ml-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full">M</Badge>}
            </h3>
            <p className="text-gray-500">{description}</p>
            {submittedAt && <p className="text-xs text-gray-400 mt-1">Submitted on {formattedDate}</p>}
          </div>

          <div>
            <Link
              href={`/products/${id}`}
              className="flex items-center gap-1 text-gray-400 hover:text-gray-600"
              onClick={handleCommentClick}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">{comments}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
