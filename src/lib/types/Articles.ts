import type { Writer } from "./Writers"

export interface Article {
  body?: string
  cloudinary_image_url: string | null
  created_at: Date
  id: number
  sample?: string
  slug: string
  title: string
  updated_at: Date
  authors?: Writer[]
}

export interface ArticleCreate {
  body: string
  excerpt: string
  title: string
  photo?: string | ArrayBuffer
}
