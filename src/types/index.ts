export interface PubicUserInfo {
  avatar: string
  email: string
  id: string
  name: string
}
export interface Comment {
  author: PubicUserInfo
  content: string
  id: string
  target: string
}

export interface Post{
  id: string
  loading?: boolean
  author: PubicUserInfo
  category: string
  comments: Comment[]
  content: String
  createdAt: string
  images: string[]
  isPublic: boolean
  likes: PubicUserInfo[]
  title: String
  updatedAt: string
  views: number
}
