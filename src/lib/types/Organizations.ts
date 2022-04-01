export interface OrganizationType {
  blurb?: string
  body?: string
  cloudinary_image_url?: string | null
  created_at: Date
  id: number
  name: string
  slug: string
  updated_at: Date
}

export interface OrganizationCreate {
  blurb: string
  body: string
  name: string
  photo?: string | ArrayBuffer
}

export interface OrganizationUpdate extends OrganizationCreate {
  id?: number
}
