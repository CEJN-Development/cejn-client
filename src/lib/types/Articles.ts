import type { Writer } from "./Writers"

export interface Article {
  authors: Writer[]
  body?: string
  caption?: string
  cloudinary_image_url?: string | null
  created_at: Date
  excerpt?: string
  id: number
  sample?: string
  slug: string
  title: string
  updated_at: Date
}

export interface ArticleUpdate {
  author_ids?: number[]
  caption?: string
  body: string
  excerpt: string
  photo?: string | ArrayBuffer
  title: string
}

export interface ArticleCreate extends ArticleUpdate {
  author_ids: number[]
}
