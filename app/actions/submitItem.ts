'use server'

import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function submitItem(formData: FormData) {
  const name = formData.get('name')?.toString()
  const description = formData.get('description')?.toString()
  const url = formData.get('url')?.toString()
  const track = formData.get('track')?.toString()
  const tagsString = formData.get('tags')?.toString()
  const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()) : null

  if (!name) {
    throw new Error('Name is required')
  }

  await supabaseAdmin
    .from('items')
    .insert({
      name,
      description: description || null,
      url: url || null,
      track: track || null,
      tags: tags,
    })

  revalidatePath('/')
} 