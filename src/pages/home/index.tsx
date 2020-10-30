import React, { useEffect, useState } from 'react'
import { Button, Empty, Spin } from 'antd'
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import './index.scss'
import { RouteComponentProps } from 'react-router'
import ButtonGroup from 'antd/lib/button/button-group'
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  SyncOutlined
} from '@ant-design/icons'
import { doLikeAction, fetchCategory, fetchPosts } from '../../gql'

const Home = (props: RouteComponentProps) => {
  const limit = 10
  const [page, setPage] = useState(1)
  const [getPosts, { loading, data }] = useLazyQuery(fetchPosts)
  const { data: Categories } = useQuery(fetchCategory)
  const [category, setCategory] = useState('')
  const [handleLike] = useMutation(doLikeAction)

  useEffect(() => {
    if (Categories && !category) {
      setCategory(Categories.category[0].value)
      getPosts({
        variables: { category: Categories.category[0].value, keyword: '', page, limit }
      })
    }
  }, [Categories])

  const onBtnClick = async (value: string) => {
    setCategory(value)
    await getPosts({
      variables: { category: value, keyword: '', limit, page: 1 }
    })
  }

  const handleFetchMore = async (p: number) => {
    await getPosts({
      variables: { category, keyword: '', limit, page: p }
    })
    setPage(p)
  }

  const handleLikeBtnClick = async (pid: any, index: number) => {
    await handleLike({
      variables: {
        target: pid
      }
    })
  }

  if (loading) {
    return <Spin spinning={loading} indicator={<SyncOutlined spin/>}/>
  }
  if (data && Categories) {
    return (
      <section className={'home-wrapper'}>
        <div className={'sub-header fixed-header shadow'}>{Categories.category.map(({ label, value }: any) =>
          <Button
            className={category === value ? 'btn-active' : ''}
            key={value}
            type={'link'}
            onClick={() => onBtnClick(value)}
          >
            {label}
          </Button>)}
        </div>
        <div className={'sub-header'}/>
        <ul>
          {
            data.posts.data.length === 0 && <Empty description={'暂无数据'}/>
          }
          {
            data.posts.data.map(({ _id, likes, images, comments, title, author: { name, _id: selfID }, createdAt }
            :{ _id: string, likes: any[], images: string[], comments: any[], title: string, author: any, createdAt: any}, index: number) =>
              <li key={_id}>
                <div className={'left-panel'}>
                  <div className={'top-info'}>
                    <span>{name}</span>
                    <span>{createdAt}</span>
                  </div>
                  <h3>{title}</h3>
                  <ButtonGroup>
                    <Button
                      className={'btn-like'}
                      type={'link'}
                      icon={
                        likes.findIndex(({ _id: uid }: { _id: any }) => uid === selfID) !== -1 ? <HeartFilled style={{ color: '#F56565' }}/> : <HeartOutlined/>}
                      onClick={() => handleLikeBtnClick(_id, index)}
                    >
                      { likes.length }
                    </Button>
                    <Button className={'btn-comment'} type={'link'}
                      icon={<CommentOutlined/>}>{comments.length}</Button>
                  </ButtonGroup>
                </div>
                <div className={'right-panel'}>
                  {images.slice(0, 3).map((image: any) => <img key={image} src={image} alt="image"/>)}
                </div>
              </li>
            )
          }
          {
            (data.posts.hasNextPage || data.posts.hasPrevPage) && <div className={'pagination-btn-wrapper'}>
              {
                data.posts.hasPrevPage && <Button
                  shape={'circle'}
                  className={'shadow-2xl'}
                  onClick={() => handleFetchMore(page - 1)}
                  icon={<ArrowUpOutlined/>}
                />

              }
              {
                data.posts.hasNextPage && <Button
                  shape={'circle'}
                  className={'shadow-2xl'}
                  onClick={() => handleFetchMore(page + 1)}
                  icon={<ArrowDownOutlined/>}
                />
              }
            </div>
          }
        </ul>

      </section>
    )
  }
  return <></>
}

export default Home
