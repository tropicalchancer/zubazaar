export type Database = {
  public: {
    Tables: {
      items: {
        Row: {
          id: string
          name: string
          description: string | null
          url: string | null
          upvotes: number
          maker: boolean
          submitted_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          url?: string | null
          upvotes?: number
          maker?: boolean
          submitted_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          url?: string | null
          upvotes?: number
          maker?: boolean
          submitted_at?: string
        }
      }
      votes: {
        Row: {
          item_id: string
          holder_hash: string
          created_at: string
        }
        Insert: {
          item_id: string
          holder_hash: string
          created_at?: string
        }
        Update: {
          item_id?: string
          holder_hash?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 