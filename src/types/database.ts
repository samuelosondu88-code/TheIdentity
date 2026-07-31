export interface Profile {
  id: string
  email: string
  role: "admin" | "user"
  created_at: string
}

export interface MusicRelease {
  id: string
  title: string
  artist: string
  description: string
  cover_image_url: string
  release_date: string
  featured: boolean
  stream_url: string
  audio_url: string
  created_at: string
}

export interface MusicLink {
  id: string
  release_id: string
  platform: string
  url: string
}

export interface Member {
  id: string
  name: string
  role: string
  bio: string
  image_url: string
  social_links: Record<string, string>
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  image_url: string
  event_date: string
  event_time: string
  venue: string
  location: string
  registration_url: string
  ticket_url: string
  ticket_price: string
  created_at: string
}

export interface GalleryImage {
  id: string
  image_url: string
  title: string
  caption: string
  category: string
  created_at: string
}

export interface NewsArticle {
  id: string
  title: string
  slug: string
  content: string
  featured_image_url: string
  status: "published" | "draft"
  published_at: string
  created_at: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  display_order: number
  active: boolean
}

export interface Video {
  id: string
  title: string
  description: string
  video_url: string
  thumbnail_url: string
  category: string
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export interface Ticket {
  id: string
  event_id: string
  event_title: string
  name: string
  email: string
  phone: string
  quantity: number
  amount: number
  status: "pending" | "confirmed" | "cancelled"
  created_at: string
}
