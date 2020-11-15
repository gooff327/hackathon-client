export const ApolloServerURL = process.env.NODE_ENV === 'development' ? 'http://localhost:12345/graphql' : window.location.host + '/graphql'
export const ProjUrl = 'https://github.com/gooff327/hackathon-client'

export enum PostTypeEnum {
  ROAST = 'roast',
  SECOND_HAND = 'second-hand',
  RENT = 'rent',
  SOCIAL = 'social',
  OTHERS = 'others'
}

export const PostTypeTest = {
  [PostTypeEnum.ROAST]: '吐槽一下',
  [PostTypeEnum.SECOND_HAND]: '闲置交易',
  [PostTypeEnum.SOCIAL]: '约饭/桌游/...',
  [PostTypeEnum.RENT]: '求/招租',
  [PostTypeEnum.OTHERS]: '其他'
}
export const CategoryIconMap:{[id: string]: string} = {
  [PostTypeEnum.ROAST]: '🤬',
  [PostTypeEnum.SECOND_HAND]: '💰',
  [PostTypeEnum.SOCIAL]: '🍻',
  [PostTypeEnum.RENT]: '🏘',
  [PostTypeEnum.OTHERS]: '🙈'
}
