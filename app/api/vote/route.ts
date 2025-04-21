import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(request: Request) {
  try {
    const { itemId } = await request.json()
    console.log('Received vote request for itemId:', itemId)
    
    if (!itemId) {
      console.log('Error: Item ID is required')
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 })
    }

    // First, get current upvotes
    const { data: currentItem, error: fetchError } = await supabaseAdmin
      .from('items')
      .select('upvotes')
      .eq('id', itemId)
      .single()

    if (fetchError) {
      console.log('Error fetching current upvotes:', fetchError)
      return NextResponse.json({ error: fetchError.message }, { status: 400 })
    }

    // Generate a unique hash for development
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 10000)
    const holderHash = `dev-${timestamp}-${random}`
    console.log('Using holderHash:', holderHash)

    // 1. Try to insert vote
    console.log('Attempting to insert vote...')
    const { error: voteError } = await supabaseAdmin
      .from('votes')
      .insert({
        item_id: itemId,
        holder_hash: holderHash,
      })

    console.log('Vote insert result:', { voteError })

    // Handle errors other than duplicate votes
    if (voteError && voteError.code !== '23505') {
      console.log('Vote insert error:', voteError)
      return NextResponse.json({ error: voteError.message }, { status: 400 })
    }

    // 2. Only increment if no duplicate vote
    if (!voteError) {
      console.log('No vote error, attempting to increment upvotes...')
      const newUpvotes = (currentItem?.upvotes || 0) + 1
      const { error: incrementError } = await supabaseAdmin
        .from('items')
        .update({ upvotes: newUpvotes })
        .eq('id', itemId)

      console.log('Increment result:', { incrementError })

      if (incrementError) {
        console.log('Increment error:', incrementError)
        return NextResponse.json({ error: incrementError.message }, { status: 400 })
      }
    } else {
      console.log('Duplicate vote detected, skipping increment')
    }

    // 3. Fetch fresh total
    console.log('Fetching fresh upvote count...')
    const { data, error: finalFetchError } = await supabaseAdmin
      .from('items')
      .select('upvotes')
      .eq('id', itemId)
      .single()

    console.log('Final fetch result:', { data, finalFetchError })

    if (finalFetchError) {
      console.log('Final fetch error:', finalFetchError)
      return NextResponse.json({ error: finalFetchError.message }, { status: 400 })
    }

    console.log('Success! Returning upvotes:', data.upvotes)
    return NextResponse.json({ upvotes: data.upvotes })
  } catch (error) {
    console.error('Unexpected error in vote process:', error)
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    )
  }
} 