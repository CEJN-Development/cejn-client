export interface LandingPage {
  body?: string
  created_at: Date
  id: number
  name: string
  preview?: string
  slug: string
  updated_at: Date
}

export interface LandingPageUpdate {
  body: string
  name?: string
  preview: string
}
