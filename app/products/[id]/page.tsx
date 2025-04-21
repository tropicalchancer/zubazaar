import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronUp, ArrowLeft, ExternalLink } from "lucide-react"
import { CommentSection } from "@/components/comment-section"
import { format } from "date-fns"

// This would normally come from a database - reduced to just 2 products
const products = [
  {
    id: "1",
    name: "Product Grunt",
    description: "The worst old products, every day",
    longDescription:
      "Product Grunt is a daily newsletter featuring the most outdated and obsolete products from around the web. We curate a list of products that were once revolutionary but have now been replaced by newer, better alternatives.",
    url: "https://example.com/product-grunt",
    upvotes: 266,
    maker: true,
    submittedAt: new Date(2025, 3, 5), // April 5, 2025
  },
  {
    id: "2",
    name: "Goji",
    description: "The Keyboard for Fun",
    longDescription:
      "Goji is a mechanical keyboard designed for both work and play. With customizable RGB lighting, hot-swappable switches, and a compact layout, it's perfect for gamers and professionals alike.",
    url: "https://example.com/goji",
    upvotes: 105,
    maker: true,
    submittedAt: new Date(2025, 3, 8), // April 8, 2025
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/" className="text-orange-500 hover:underline">
          Return to home
        </Link>
      </div>
    )
  }

  // Format the submission date
  const formattedDate = product.submittedAt ? format(product.submittedAt, "MMMM d, yyyy") : ""

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-1 min-w-[60px]">
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <ChevronUp className="h-6 w-6 text-gray-500" />
                <span className="sr-only">Upvote</span>
              </Button>
              <span className="text-sm font-medium text-gray-700">{product.upvotes}</span>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {product.name}
                {product.maker && (
                  <Badge className="ml-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full">M</Badge>
                )}
              </h1>
              <p className="text-gray-500 mb-1">{product.description}</p>
              {formattedDate && <p className="text-sm text-gray-400 mb-4">Submitted on {formattedDate}</p>}

              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">About this product</h2>
                <p className="text-gray-700">{product.longDescription}</p>
              </div>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600"
              >
                Visit website
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <CommentSection productId={params.id} />
      </main>
    </div>
  )
}
