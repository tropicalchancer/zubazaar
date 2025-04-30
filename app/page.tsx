import { format } from 'date-fns'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import ProductCard from '@/components/product-card'
import SimpleSubmitForm from '@/components/simple-submit-form'
import { Terminal, Zap } from 'lucide-react'

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
  const currentYear = new Date().getFullYear()

  const asciiLogo = `
███████╗██╗   ██╗██████╗  █████╗ ███████╗ █████╗  █████╗ ██████╗ 
╚══███╔╝██║   ██║██╔══██╗██╔══██╗╚══███╔╝██╔══██╗██╔══██╗██╔══██╗
  ███╔╝ ██║   ██║██████╔╝███████║  ███╔╝ ███████║███████║██████╔╝
 ███╔╝  ██║   ██║██╔══██╗██╔══██║ ███╔╝  ██╔══██║██╔══██║██╔══██╗
███████╗╚██████╔╝██████╔╝██║  ██║███████╗██║  ██║██║  ██║██║  ██║
╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
  `

  return (
    <main className="min-h-screen bg-background text-foreground pb-16">
      <div className="container mx-auto px-4">
        {/* ASCII Art Header */}
        <pre className="ascii-art text-center pt-8 pb-4 hidden md:block text-base">
          {asciiLogo}
        </pre>
        
        <p className="text-center text-[#25ff61]/80 font-mono text-sm mb-12">
          a place for techno optimists with an interdisciplinary soul to share products, projects and experiments.
        </p>
        
        <div className="flex flex-col items-center mb-12">
          <div className="terminal-window px-6 py-3 mb-6">
            <div className="flex items-center gap-2 font-mono">
              <Terminal className="h-4 w-4 text-[#25ff61]" />
              <span className="text-[#25ff61]">CURRENT_TIMESTAMP:</span>
              <span className="text-[#25ff61] glitch">{currentMonth} {currentYear}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <SimpleSubmitForm />
            <div className="h-8 w-px bg-[#25ff61]/20"></div>
            <div className="flex items-center gap-2 text-[#25ff61]/60">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-mono">{items.length} projects_loaded</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 max-w-6xl mx-auto">
          {items.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description || ''}
              url={item.url || ''}
              upvotes={item.upvotes}
              track={item.track}
              tags={item.tags}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
