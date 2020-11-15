import React, { FunctionComponent } from 'react'
import { Flex, Link, Skeleton, Text, Button } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Comment } from '../../../../types'

export interface PostFooterProps {
  createdAt: string,
  _id: string,
  mt: string
  likes?: any[],
  comments?: Comment[]
  isPure: boolean
}

const PostFooter: FunctionComponent<PostFooterProps> = (
  {
    mt,
    _id,
    createdAt,
    isPure,
    comments,
    likes
  }) =>
  <Flex mt={mt} fontSize={'12px'} cursor={'default'}>
    <Link as={'small'} href={`/detail?id=${_id}`}>阅读全文</Link>
    <Text as={'small'} mx={'6px'}>·</Text>
    <Text as={'small'}>{dayjs(parseInt(createdAt)).format('YYYY-MM-DD')}</Text>
    {
      !isPure && likes && comments && <>
        <Text as={'small'} mx={'6px'}>·</Text>
        <Text as={'small'}> {likes.length} 人喜欢 </Text>
        <Text as={'small'} mx={'6px'}>·</Text>
        <Text as={'small'}>{comments.length}人点评 </Text>
      </>
    }

  </Flex>
export const PostFooterSkeleton = ({ mt }: any) =>
  <Skeleton w={'40%'} height={'12px'} mt={mt} fontSize={'20px'}/>
export default PostFooter
