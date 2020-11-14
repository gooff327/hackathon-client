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

export interface PostType {
  _id: string,
  likes: any[],
  images: string[],
  comments: Comment[],
  title: string,
  author: any,
  createdAt: any,
  content: string,
  category: {
    value: string
    label: string
  }
}
