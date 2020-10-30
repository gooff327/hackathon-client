export enum HomeActionEnumTypes {
  ADD_POST_TO_LIKE = 'ADD_POST_TO_LIKE',
  REMOVE_POST_TO_LIKE = 'REMOVE_POST_TO_LIKE'
}

export interface LikePayload {
  [id: string]: boolean
}

export interface HomeState {
  likeMap: LikePayload
}

interface AddPostToLikeAction {
  type: HomeActionEnumTypes.ADD_POST_TO_LIKE
  payload: LikePayload
}

interface RemovePostFromAction {
  type: HomeActionEnumTypes.REMOVE_POST_TO_LIKE
  payload: LikePayload
}
export type HomeActionTypes = AddPostToLikeAction | RemovePostFromAction
