import { Flex, Image, Text, Icon } from '@chakra-ui/react'
import PostSource from '../PostSource'
import PostFooter from '../PostFooter'
import React, { FunctionComponent, ReactElement } from 'react'

interface PostProps {
  _id: string
  author: any
  category: { label: string, value: string }
  title: string
  createdAt: string
  images: string[],
  content?: ReactElement
  footer?: ReactElement,
  navToDetail: () => void
}

const Post: FunctionComponent<PostProps> = (
  {
    _id,
    author,
    category,
    title,
    createdAt,
    images,
    content,
    footer,
    navToDetail
  }) => <Flex key={_id} pb={'30px'} alignItems={'center'}>
  <Flex w={'100%'} h={'100%'} justify={'space-between'} direction={'column'}>
    <PostSource category={category} author={author}/>
    <Text
      className={'post-title'}
      as={'h2'}
      fontSize={'16px'}
      maxH={content ? '20px' : '40px'}
      lineHeight={'20px'}
      fontWeight={700}
      mr={'12px'}
      onClick={navToDetail}
    >
      {title}
    </Text>
    {content}
    {footer || <PostFooter createdAt={createdAt} _id={_id} mt={'8px'} isPure={true}/>}
  </Flex>
  <Flex
    maxW={content ? '200px' : '100px'}
    maxH={content ? '130px' : '100px'}
    w={{ base: '140px', md: content ? '200px' : '100px' }}
    h={content ? '130px' : '100px'}
  >
    {
      (images.length > 0) ? <Image
        objectFit={'cover'}
        maxW={content ? '200px' : '100px'}
        w={{ base: '140px', md: content ? '200px' : '140px' }}
        src={images[0]}
        borderRadius={'4px'}/>
        : <Text w={{ base: '140px', md: content ? '200px' : '140px' }}/>
    }
  </Flex>
</Flex>

export default Post
