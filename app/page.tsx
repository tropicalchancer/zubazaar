import { format } from 'date-fns'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import ProductCard from '@/components/product-card'
import SimpleSubmitForm from '@/components/simple-submit-form'

async function getItems() {
  const { data: items } = await supabaseAdmin
    .from('items')
    .select('*')
    .order('submitted_at', { ascending: false })

  return items || []
}

export default async function Home() {
  const items = await getItems()
  const currentMonth = format(new Date(), 'MMMM').toUpperCase()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-4">
          <h1 className="text-2xl font-bold text-gray-800">{currentMonth}</h1>
          <span className="text-gray-500">{new Date().getFullYear()}</span>
        </div>
      </div>

      <SimpleSubmitForm />

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description || ''}
            url={item.url || ''}
            upvotes={item.upvotes}
          />
        ))}
      </div>
    </main>
  )
}
