import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(request: Request) {
  try {
    const { itemId } = await request.json()
    
    if (!itemId) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 })
    }

    // For now, using a dev hash as specified
    const holderHash = 'dev-hash'

    // Insert vote
    const { error: voteError } = await supabaseAdmin
      .from('votes')
      .insert({
        item_id: itemId,
        holder_hash: holderHash,
      })

    if (voteError?.code === '23505') { // Unique violation
      return NextResponse.json(
        { error: 'Already voted' },
        { status: 409 }
      )
    }

    if (voteError) {
      throw voteError
    }

    // Increment upvotes count
    const { data: item, error: updateError } = await supabaseAdmin
      .from('items')
      .update({ upvotes: supabaseAdmin.rpc('increment') })
      .eq('id', itemId)
      .select('upvotes')
      .single()

    if (updateError) {
      throw updateError
    }

    return NextResponse.json({ upvotes: item.upvotes })
  } catch (error) {
    console.error('Vote error:', error)
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    )
  }
} 