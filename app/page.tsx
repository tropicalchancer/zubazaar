"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"
import { SimpleSubmitForm } from "@/components/simple-submit-form"
import { format } from "date-fns"
import { getCommentsForProduct } from "@/lib/comments"

// Define product type
interface Product {
  id: string
  name: string
  description: string
  upvotes: number
  maker: boolean
  url?: string
  submittedAt: Date
}

// Initial product data - reduced to just 2 products
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Product Grunt",
    description: "The worst old products, every day",
    upvotes: 266,
    maker: true,
    submittedAt: new Date(2025, 3, 5), // April 5, 2025
  },
  {
    id: "2",
    name: "Goji",
    description: "The Keyboard for Fun",
    upvotes: 105,
    maker: true,
    submittedAt: new Date(2025, 3, 8), // April 8, 2025
  },
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [showForm, setShowForm] = useState(false)

  // Get current month name
  const currentMonth = format(new Date(), "MMMM").toUpperCase()

  // Function to add a new product
  const handleAddProduct = (newProduct: { name: string; description: string; url: string }) => {
    const productToAdd: Product = {
      id: String(Date.now()), // Use timestamp for unique ID
      upvotes: 0,
      maker: true,
      submittedAt: new Date(), // Current date and time
      ...newProduct,
    }

    setProducts([productToAdd, ...products])
    setShowForm(false)
    console.log("Product added:", productToAdd)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Newsletter Section */}
      <div className="bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-gray-900">
            Get the best new product discoveries in your inbox daily!
          </h2>
          <div className="flex w-full sm:w-auto gap-2">
            <Input type="email" placeholder="Your email" className="max-w-xs bg-white" />
            <Button className="bg-orange-500 hover:bg-orange-600">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-baseline gap-4">
            <h1 className="text-2xl font-bold text-gray-800">{currentMonth}</h1>
            <span className="text-gray-500">{new Date().getFullYear()}</span>
          </div>
          <div>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowForm(true)}>
              Submit Product
            </Button>
          </div>
        </div>

        {/* Simple Submit Form */}
        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
            <SimpleSubmitForm onSubmit={handleAddProduct} onCancel={() => setShowForm(false)} />
          </div>
        )}

        <div className="space-y-4">
          {products.map((product) => {
            // Get the actual comment count for this product
            const commentCount = getCommentsForProduct(product.id).length

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                upvotes={product.upvotes}
                comments={commentCount}
                maker={product.maker}
                submittedAt={product.submittedAt}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}
