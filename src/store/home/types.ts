export enum HomeActionEnumTypes {
  UPDATE_KEYWORD = 'UPDATE_KEYWORD',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  UPDATE_SORT = 'UPDATE_SORT',
}

export interface PostFilter {
  category: string
  keyword: string
  sortReverse: boolean
  sortByDate: boolean
  sortByHot: boolean
}

export interface HomeState {
  filters: PostFilter
}

interface UpdateCategory {
  type: HomeActionEnumTypes.UPDATE_CATEGORY
  payload: { category: string}
}

interface UpdateKeyword {
  type: HomeActionEnumTypes.UPDATE_KEYWORD
  payload: { keyword: string}
}
interface UpdateSortByDate {
  type: HomeActionEnumTypes.UPDATE_SORT
  payload: { sortByDate: boolean, sortByHot: boolean, sortReverse: boolean}
}
export type HomeActionTypes =
    | UpdateCategory
    | UpdateKeyword
    | UpdateSortByDate
