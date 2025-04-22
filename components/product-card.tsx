"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowBigUp, Terminal, Hash } from 'lucide-react'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  name: string
  description: string
  url: string
  upvotes: number
  track?: string | null
  tags?: string[] | null
}

export default function ProductCard({ 
  id, 
  name, 
  description, 
  url, 
  upvotes: initialUpvotes,
  track,
  tags 
}: ProductCardProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [isVoting, setIsVoting] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <Card 
      className={`terminal-window transition-all duration-300 ${isHovered ? 'scale-[1.02]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="terminal-header">
        <div className="terminal-button"></div>
        <div className="terminal-button"></div>
        <div className="terminal-button"></div>
        <div className="flex-1 text-black text-xs font-mono">project.exe</div>
      </div>
      
      <div className="p-6 scanlines">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className={`h-24 w-12 border border-[#25ff61] hover:bg-[#25ff61]/10 ${isVoting ? 'animate-pulse' : ''}`}
              onClick={handleUpvote}
              disabled={isVoting}
            >
              <ArrowBigUp className="h-6 w-6 text-[#25ff61]" />
              <span className="mt-1 font-mono text-[#25ff61] text-glow shadow-[#25ff61]">{upvotes}</span>
            </Button>
          </div>

          <div className="flex-1 font-mono">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="h-4 w-4 text-[#25ff61]" />
              <Link 
                href={`/products/${id}`}
                className="text-xl font-bold text-[#25ff61] hover:underline glitch"
              >
                {name}
              </Link>
              {track && (
                <Badge variant="secondary" className="ml-2 bg-[#25ff61]/10 text-[#25ff61] border-[#25ff61]/20">
                  {track}
                </Badge>
              )}
            </div>
            
            <div className="group relative">
              <p className="text-[#25ff61]/80 text-sm leading-relaxed mb-2">{description}</p>
              
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="text-[#25ff61]/60 border-[#25ff61]/20"
                    >
                      <Hash className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <Link 
                href={url} 
                target="_blank"
                className="mt-2 text-xs text-[#25ff61]/60 hover:text-[#25ff61] transition-colors inline-flex items-center gap-1"
              >
                &gt; Visit_Project
                <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
