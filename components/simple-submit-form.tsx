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
        className="w-full bg-orange-500 hover:bg-orange-600" 
        onClick={() => setIsOpen(true)}
      >
        Submit Product
      </Button>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          name="name"
          placeholder="Product Name"
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <Textarea
          name="description"
          placeholder="Description"
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <Input
          name="url"
          type="url"
          placeholder="Product URL"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(false)}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}
