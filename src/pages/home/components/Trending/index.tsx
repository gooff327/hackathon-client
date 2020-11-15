import { useQuery } from '@apollo/react-hooks'
import React, { FunctionComponent } from 'react'
import { fetchHotPosts } from '../../../../gql'
import { Avatar, Box, Button, Divider, Flex, Image, Link, Skeleton, Text, useColorModeValue } from '@chakra-ui/react'
import PostSource, { PostSourceSkeleton } from '../PostSource'
import PostFooter, { PostFooterSkeleton } from '../PostFooter'
import { PostType } from '../../../../types'
import Post from '../Post'

const HottestPostSkeleton = () => {
  return <Box w={'100%'} h={'520px'}>
    <Link>
      <Skeleton width={'100%'} height={'50%'} borderRadius={'4px'}/>
    </Link>
    <PostSourceSkeleton mt={'16px'}/>
    <Link >
      <Skeleton height={'28px'} mt={'6px'} lineHeight={'28px'}/>
      <Skeleton height={'28px'} mt={'6px'} lineHeight={'28px'} w={'75%'}/>
      <Skeleton as={'p'} className={'post-desc'} mt={'6px'} height={'20px'}/>
      <Skeleton as={'p'} className={'post-desc'} mt={'6px'} height={'20px'}/>
      <Skeleton as={'p'} className={'post-desc'} mt={'6px'} height={'20px'} width={'50%'} />
    </Link>
    <PostFooterSkeleton mt={'16px'}/>
  </Box>
}

const HottestPost = ({ _id, images, author, category, title, content, createdAt }: PostType) => {
  // const titleColor = useColorModeValue('gray.900', 'white')

  return <Box flex={1}>
    <Box w={'100%'} overflow={'hidden'}>
      <Link as={'div'} href={`/detail?id=${_id}`} w={'100%'} paddingTop={'100%'} position={'relative'}>
        <Image position={'absolute'} top={0} left={0} verticalAlign={'middle'} w={'100%'} h={'auto'} src={images[0]} borderRadius={'4px'} objectFit={'cover'}/>
      </Link>
    </Box>
    <PostSource category={category} author={author} mt={'16px'}/>
    <Link href={`/detail?id=${_id}`} _hover={{ textDecoration: 'none' }}>
      <Text as={'h2'} className={'post-title'} fontSize={'22px'} fontWeight={700} maxHeight={'56px'}
        lineHeight={'28px'}>{title}</Text>
      <Text as={'h3'} className={'post-desc'} pt={'6px'} fontSize={'18px'} maxHeight={'84px'}
        lineHeight={'28px'}>{content}</Text>
    </Link>
    <PostFooter createdAt={createdAt} _id={_id} mt={'16px'} isPure={true}/>
  </Box>
}

const ListPost = ({ posts }: any) => {
  return posts.map(({ _id, images, author, category, title, createdAt }: any) =>
    (<Post key={_id} _id={_id} images={images} author={author} title={title} category={category} createdAt={createdAt} />))
}
interface ListPostSkeletonProps {
  hasContent?: boolean
}
export const ListPostSkeleton: FunctionComponent<ListPostSkeletonProps> = ({ hasContent }) =>
  <Flex pb={'30px'} gridGap={'12px'} alignItems={'center'}>
    <Flex w={'100%'} h={'100%'} justify={'space-between'} direction={'column'}>
      <PostSourceSkeleton />
      <Skeleton h={'20px'} my={'6px'}/>
      {
        hasContent && <Skeleton h={'20px'} my={'6px'}/>
      }
      <Skeleton h={'20px'} my={'6px'} w={'75%'}/>
      <PostFooterSkeleton mt={'8px'} />
    </Flex>
    <Flex>
      <Skeleton w={ hasContent ? '200px' : '100px'} h={ hasContent ? '130px' : '100px'}/>
    </Flex>
  </Flex>

const Trending = () => {
  const { loading, data } = useQuery(fetchHotPosts)
  if (loading) {
    return <Box m={['0 12px', '0 24px', '0 48px', '0 48px']}>
      <Flex wrap={'wrap'} gridGap={'16px'} direction={{ base: 'column', sm: 'column', md: 'row' }}>
        <Flex minWidth={'330px'} flex={1} direction={'column'} verticalAlign={'middle'}
          borderBottomWidth={{ base: '1px', md: '0px' }}
          marginBottom={{ sm: 0 }}
          padding={{ base: '0 12px', sm: '0 16px' }}
        >
          <HottestPostSkeleton/>
        </Flex>
        <Box minWidth={'330px'} flex={1} borderBottom={{ base: '1px solid', sm: 0 }}
          borderColor={'gray.100'} marginBottom={{ base: '32px', sm: 0 }}
          padding={{ base: '0 12px', sm: '0 16px' }}
        >
          <ListPostSkeleton/>
          <ListPostSkeleton/>
          <ListPostSkeleton/>
          <ListPostSkeleton/>
        </Box>
        <Flex
          minWidth={'330px'}
          padding={{ base: '12px', sm: '16px' }}
          direction={'column'}
          flex={1}
          flexWrap={'wrap'}

        >
          <Box flex={{ sm: 0, md: 0, lg: 0, xl: 0 }} borderBottom={{ base: '1px solid', sm: 0, md: 0 }}
            pb={'14px'}
            w={{ sm: '100%', md: '50%', lg: '100%' }}
            minW={'300px'}
          >
            <Skeleton h={'16px'} w={'30%'} mb={'20px'}/>
            <Flex w={'100%'} my={'6px'} gridGap={'10px'}>
              <Flex direction={'column'} align={'center'}>
                <Skeleton w={'64px'} h={'64px'} borderRadius={'50%'} mb={'4px'} />
                <Skeleton h={'12px'} width={'60px'}/>
              </Flex>
              <Flex direction={'column'} align={'center'}>
                <Skeleton w={'64px'} h={'64px'} borderRadius={'50%' } mb={'4px'} />
                <Skeleton h={'12px'} width={'60px'}/>
              </Flex>
            </Flex>
          </Box>
          <Box flex={1} pb={'12px'}>
            <Skeleton h={'16px'} mb={'20px'} w={'30%'}/>
            <Flex justify={'space-between'} align={'center'} my={'24px'}>
              <Skeleton h={'32px'} w={'40%'}/>
              <Skeleton h={'32px'} w={'48px'}/>
            </Flex>
            <Flex justify={'space-between'} align={'center'} my={'24px'}>
              <Skeleton h={'32px'} w={'40%'}/>
              <Skeleton h={'32px'} w={'48px'}/>
            </Flex>
            <Flex justify={'space-between'} align={'center'} my={'24px'}>
              <Skeleton h={'32px'} w={'40%'}/>
              <Skeleton h={'32px'} w={'48px'}/>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  }
  if (data) {
    return <Flex
      m={['0 12px', '0 24px', '0 48px', '0 48px']}
      h={'auto'}
    >
      <Flex
        flex={1}
        wrap={'wrap'}
        gridGap={'16px'}
        direction={{ base: 'column', md: 'row' }}
        borderBottomWidth={'1px'}
        pb={'24px'}
      >
        <Flex
          minWidth={'330px'}
          flex={1} direction={'column'}
          verticalAlign={'middle'}
          borderBottomWidth={{ base: '1px', md: '0px' }}
          marginBottom={{ sm: 0 }}
          padding={{ base: '0 12px 12px 12px', sm: '0 16px 16px 16px', md: '0 16px 16px 16px' }}
        >
          <HottestPost {...data.hotPosts[0]}/>
        </Flex>
        <Box minWidth={'330px'} flex={1} borderBottom={{ base: '1px solid', sm: 0 }}
          borderColor={'gray.100'} marginBottom={{ base: '32px', sm: 0 }}
          padding={{ base: '0 12px', sm: '0 16px' }}
        >
          <ListPost posts={data.hotPosts.slice(1, 5)}/>
        </Box>
        <Flex
          minWidth={'330px'}
          padding={{ base: '12px', sm: '16px' }}
          direction={{ base: 'column', md: 'row', lg: 'row', xl: 'column' }}
          flex={1}
          flexWrap={'wrap'}

        >
          <Box
            flex={{ sm: 0, md: 0, lg: 0, xl: 0 }}
            borderBottom={{ base: '1px solid', sm: 0, md: 0 }}
            pb={'12px'}
            w={{ sm: '100%', md: '50%', lg: '100%' }}
            minW={'300px'}
          >
            <Text as={'h2'} fontWeight={600} pb={'20px'}>最近更新</Text>
            <Flex w={'100%'} gridGap={'10px'}>
              <Flex direction={'column'} align={'center'}>
                <Avatar w={'64px'} h={'64px'} src={'https://i.loli.net/2020/10/30/SM4GnApW5VRzrTv.jpg'}/>
                <Text as={'span'} fontSize={'12px'}>Gooff</Text>
              </Flex>
            </Flex>
          </Box>
          <Box flex={1} pb={'12px'} userSelect={'none'}>
            <Text as={'h2'} fontWeight={600} pb={'20px'}>可能感兴趣的话题</Text>
            <Flex justify={'space-between'} align={'center'}>
              <Text fontWeight={700} fontSize={'16px'}>吐槽一下</Text>
              <Button variant={'outline'} size={'sm'} colorScheme={'black'}>关注</Button>
            </Flex>
            <Divider m={'16px 0'}/>
            <Flex justify={'space-between'} align={'center'}>
              <Text fontWeight={700} fontSize={'16px'}>闲置交互</Text>
              <Button variant={'outline'} size={'sm'} colorScheme={'black'}>关注</Button>
            </Flex>
            <Divider m={'16px 0'}/>
            <Flex justify={'space-between'} align={'center'} mb={'16px'}>
              <Text fontWeight={700} fontSize={'16px'}>植发</Text>
              <Button variant={'outline'} size={'sm'} colorScheme={'black'}>关注</Button>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  }
  return <></>
}

export default Trending
