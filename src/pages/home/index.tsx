import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import './index.scss'
import { RouteComponentProps } from 'react-router'
import { doLikeAction, fetchCategory, fetchPosts } from '../../gql'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducers'
import { PostFilter } from '../../store/home/types'
import {
  updateCategory, updateSort
} from '../../store/home/actions'
import Trending, { ListPostSkeleton } from './components/Trending'
import { Box, Flex, Text } from '@chakra-ui/react'
import { PostType } from '../../types'
import Post from './components/Post'
import PostFooter from './components/PostFooter'

const Home = (props: RouteComponentProps) => {
  const limit = 10
  const defaultPage = 1
  const [page, setPage] = useState(defaultPage)
  const [getPosts, { loading, data }] = useLazyQuery(fetchPosts)
  const { data: Categories } = useQuery(fetchCategory)
  const [handleLike] = useMutation(doLikeAction)
  const dispatch = useDispatch()
  const filter = useSelector<RootState, PostFilter>(state => state.home.filters)

  useEffect(() => {
    if (filter.category === '') return
    getPosts({
      variables: {
        limit,
        page: defaultPage,
        ...filter
      }
    })
  }, [filter])

  const history = useHistory()

  useEffect(() => {
    if (Categories && !filter.category) {
      dispatch(updateCategory({ category: Categories.category[0].value }))
      getPosts({
        variables: { category: Categories.category[0].value, keyword: '', page, limit }
      })
    }
  }, [Categories])

  const onBtnClick = async (value: string) => {
    dispatch(updateCategory({ category: value }))
    await getPosts({
      variables: { category: value, keyword: '', limit, page: 1 }
    })
  }

  const handleFetchMore = async (p: number) => {
    await getPosts({
      variables: { ...filter, limit, page: p }
    })
    setPage(p)
  }

  const handleLikeBtnClick = async (pid: any, index: number) => {
    await handleLike({
      variables: {
        target: pid
      }
    }).catch(error => {
      throw error
    })
  }

  const handleUpdateSort = (payload : any) => {
    dispatch(updateSort(payload))
  }

  const handleNavToDetail = (id:string) => {
    history.push(`/detail?id=${id}`)
  }

  const LoadingListPlaceholder = () => <>
    {
      Array.from(new Array(5).keys()).map(i => <ListPostSkeleton key={i} hasContent />)
    }
  </>

  return (
    <Flex m={'auto'} flex={1} direction={'column'} width={'100%'} maxWidth={'1192px'} className={'home-wrapper'}>
      <Trending />
      {/* <Box m={['0 12px', '0 24px', '0 48px', '0 48px']} className={'sort-wrapper'}> */}
      {/*  <div> */}
      {/*    <Button */}
      {/*      shape={'round'} */}
      {/*      type={filter.sortByDate && filter.sortReverse ? 'primary' : 'default'} */}
      {/*      size={'small'} */}
      {/*      onClick={() => handleUpdateSort({ sortReverse: true, sortByDate: true, sortByHot: false })} */}
      {/*    > */}
      {/*      按日期降序 */}
      {/*    </Button> */}
      {/*    <Button */}
      {/*      shape={'round'} */}
      {/*      type={filter.sortByDate && !filter.sortReverse ? 'primary' : 'default'} */}
      {/*      size={'small'} */}
      {/*      onClick={() => handleUpdateSort({ sortReverse: false, sortByDate: true, sortByHot: false })} */}
      {/*    > */}
      {/*      按日期升序 */}
      {/*    </Button>  <Button */}
      {/*      shape={'round'} */}
      {/*      type={filter.sortByHot && filter.sortReverse ? 'primary' : 'default'} */}
      {/*      size={'small'} */}
      {/*      onClick={() => handleUpdateSort({ sortReverse: true, sortByDate: false, sortByHot: true })} */}
      {/*    > */}
      {/*    按热度降序 */}
      {/*    </Button> */}
      {/*    <Button */}
      {/*      shape={'round'} */}
      {/*      type={filter.sortByHot && !filter.sortReverse ? 'primary' : 'default'} */}
      {/*      size={'small'} */}
      {/*      onClick={() => handleUpdateSort({ sortReverse: false, sortByDate: false, sortByHot: true })} */}
      {/*    > */}
      {/*      按热度升序 */}
      {/*    </Button> */}
      {/*  </div> */}
      {/*  <div className={'pagination-btn-wrapper'}> */}
      {/*    <Button */}
      {/*      disabled={!data.posts.hasPrevPage } */}
      {/*      shape={'round'} */}
      {/*      size={'small'} */}
      {/*      className={'shadow-2xl'} */}
      {/*      onClick={() => handleFetchMore(page - 1)} */}
      {/*      icon={<ArrowUpOutlined/>} */}
      {/*    /> */}
      {/*    <Button */}
      {/*      disabled={!data.posts.hasNextPage} */}
      {/*      size={'small'} */}
      {/*      shape={'round'} */}
      {/*      className={'shadow-2xl'} */}
      {/*      onClick={() => handleFetchMore(page + 1)} */}
      {/*      icon={<ArrowDownOutlined/>} */}
      {/*    /> */}
      {/*  </div> */}
      {/* </Box> */}
      {
        loading && <Box as={'ul'} m={['24px 24px', '24px 40px', '24px 64px', '24px 64px']}>
          {<LoadingListPlaceholder/>}
        </Box>
      }
      {
        data && Categories && <Box as={'ul'} m={['24px 24px', '24px 40px', '24px 64px', '24px 64px']}>
          {
            data.posts.data.map(({ _id, likes, images, comments, title, author, createdAt, category, content }: PostType) =>
              <Post
                key={_id}
                _id={_id}
                author={author}
                category={category}
                title={title}
                createdAt={createdAt}
                images={images}
                content={
                  <Text
                    as={'p'}
                    cursor={'default'}
                    className={'post-desc'}
                    pt={'6px'}
                    fontSize={'14px'}
                    maxHeight={'56px'}
                    lineHeight={'28px'}
                    mr={'10px'}
                  >
                    {content}
                  </Text>}
                footer={
                  <PostFooter
                    isPure={false}
                    mt={'16px'}
                    createdAt={createdAt}
                    comments={comments}
                    _id={_id}
                    likes={likes}
                  />}
              />
            )
          }
        </Box>
      }

    </Flex>
  )
}

export default Home
