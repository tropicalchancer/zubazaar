"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { submitItem } from '@/app/actions/submitItem'
import { Terminal, X, Upload, Loader2 } from 'lucide-react'

export default function SimpleSubmitForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      await submitItem(formData)
      formRef.current?.reset()
      setIsOpen(false)
    } catch (error) {
      console.error('Failed to submit:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) {
    return (
      <Button 
        className="bg-[#25ff61] hover:bg-[#25ff61]/90 text-black font-mono"
        onClick={() => setIsOpen(true)}
      >
        <Terminal className="mr-2 h-4 w-4" />
        SUBMIT_PROJECT.exe
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="terminal-window w-full max-w-2xl mx-4">
        <div className="terminal-header">
          <div className="terminal-button"></div>
          <div className="terminal-button"></div>
          <div className="terminal-button"></div>
          <div className="flex-1 text-black text-xs font-mono">new_project.exe</div>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <form ref={formRef} onSubmit={handleSubmit} className="p-8 space-y-6 scanlines">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-mono text-[#25ff61]">PROJECT_NAME</label>
            <Input
              id="name"
              name="name"
              placeholder="Enter project name..."
              required
              disabled={isSubmitting}
              className="font-mono bg-black/50 border-[#25ff61] text-[#25ff61] placeholder:text-[#25ff61]/30
                focus-visible:ring-[#25ff61] focus-visible:ring-offset-0"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-mono text-[#25ff61]">PROJECT_DESCRIPTION</label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your project..."
              disabled={isSubmitting}
              className="font-mono bg-black/50 border-[#25ff61] text-[#25ff61] placeholder:text-[#25ff61]/30
                focus-visible:ring-[#25ff61] focus-visible:ring-offset-0 min-h-[120px]"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-mono text-[#25ff61]">PROJECT_URL</label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://..."
              disabled={isSubmitting}
              className="font-mono bg-black/50 border-[#25ff61] text-[#25ff61] placeholder:text-[#25ff61]/30
                focus-visible:ring-[#25ff61] focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
              className="font-mono text-[#25ff61] hover:text-[#25ff61]/80 hover:bg-[#25ff61]/10"
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-mono bg-[#25ff61] text-black hover:bg-[#25ff61]/90 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  UPLOADING...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  SUBMIT_PROJECT
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
