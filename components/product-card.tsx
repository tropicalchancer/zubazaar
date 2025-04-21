"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowBigUp } from 'lucide-react'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  name: string
  description: string
  url: string
  upvotes: number
}

export default function ProductCard({ id, name, description, url, upvotes: initialUpvotes }: ProductCardProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [isVoting, setIsVoting] = useState(false)

  const handleUpvote = async () => {
    if (isVoting) return
    
    setIsVoting(true)
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: id }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to vote')
      }

      const data = await response.json()
      setUpvotes(data.upvotes)
    } catch (error) {
      console.error('Failed to upvote:', error)
      // Optionally show error to user
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-24 w-12"
          onClick={handleUpvote}
          disabled={isVoting}
        >
          <ArrowBigUp className="h-6 w-6" />
          <span className="mt-1">{upvotes}</span>
        </Button>

        <div className="flex-1">
          <Link href={url} target="_blank" className="hover:underline">
            <h2 className="text-xl font-semibold">{name}</h2>
          </Link>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
      </div>
    </Card>
  )
}
