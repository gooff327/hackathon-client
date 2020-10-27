export enum PostTypeEnum {
    ROAST = 'roast',
    SECOND_HAND = 'second-hand',
    RENT = 'rent',
    OTHERS = 'others'
}

export const PostTypeTest = {
  [PostTypeEnum.ROAST]: '吐槽一下',
  [PostTypeEnum.SECOND_HAND]: '闲置交易',
  [PostTypeEnum.RENT]: '求/招租',
  [PostTypeEnum.OTHERS]: '其他'
}
