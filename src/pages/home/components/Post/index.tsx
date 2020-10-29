import React, { FunctionComponent } from 'react'
import { Post } from '../../../../types'
import { List, Button } from 'antd'
import { CommentOutlined, HeartOutlined } from '@ant-design/icons'
import ButtonGroup from 'antd/lib/button/button-group'
import { RouteComponentProps } from 'react-router'

interface PostProps {
  post: Post[]
  loading: boolean
  fetchMore: any
}

// eslint-disable-next-line react/prop-types
const ListView:FunctionComponent<RouteComponentProps & PostProps> = (
  props:RouteComponentProps, { fetchMore, post, loading }:PostProps) => {
  console.log('post', post)
  const loadMore = !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px'
      }}
    >
      <Button onClick={fetchMore}>加载更多</Button>
    </div>
  )
    : null

  const handleNavToDetail = () => {
    console.log(props)
  }
  return <div>
    {
      post?.map(({ likes, images, comments, title, author: { name }, createdAt }) => (
        <div key={createdAt} onClick={handleNavToDetail}>
          <div className={'left-panel'}>
            <div className={'top-info'}>
              <span>{name}</span>
              <span>{createdAt}</span>
            </div>
            <h3>{title}</h3>
            <ButtonGroup>
              <Button className={'btn-like'} type={'link'} icon={<HeartOutlined />}>{likes.length}</Button>
              <Button className={'btn-comment'} type={'link'} icon={<CommentOutlined />}>{comments.length}</Button>
            </ButtonGroup>
          </div>
          <div className={'right-panel'}>
            {images.slice(0, 3).map(image => <img key={image} src={image} alt="image" />)}
          </div>
        </div>
      ))
    }
  </div>
}

const CardView = () => {}

const Detail = () => {}

export default {
  ListView,
  CardView,
  Detail
}
