"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { submitItem } from '@/app/actions/submitItem'

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
      // Optionally show error to user
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) {
    return (
      <Button 
        className="bg-orange-500 hover:bg-orange-600" 
        onClick={() => setIsOpen(true)}
      >
        Submit Product
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl mx-4 rounded-2xl overflow-hidden shadow-2xl transform transition-all">
        <div className="px-8 py-6 bg-gradient-to-r from-orange-500/10 to-purple-500/10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
            Share Something Amazing
          </h2>
          <p className="text-gray-600 mt-2">Let's discover your next favorite product together.</p>
        </div>
        
        <form ref={formRef} onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Product Name</label>
            <Input
              id="name"
              name="name"
              placeholder="What's it called?"
              required
              disabled={isSubmitting}
              className="text-lg py-6 px-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
            <Textarea
              id="description"
              name="description"
              placeholder="Tell us what makes this product special..."
              disabled={isSubmitting}
              className="min-h-[120px] text-lg rounded-xl border-2 border-gray-200 focus:border-orange-500 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium text-gray-700">Product URL</label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://..."
              disabled={isSubmitting}
              className="text-lg py-6 px-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 transition-colors"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
              className="px-6 py-5 rounded-xl text-base hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-5 rounded-xl text-base bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white font-medium"
            >
              {isSubmitting ? 'Submitting...' : 'Share Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
