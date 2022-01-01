export interface Writer {
  byline: string
  full_name: string
  created_at: Date
  id: number
  slug: string
  updated_at: Date
  cloudinary_image_url?: string
}
