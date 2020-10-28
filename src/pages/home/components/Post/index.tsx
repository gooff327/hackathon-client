import React, { FunctionComponent } from 'react'
import { Post } from '../../../../types'
import { List, Button } from 'antd'
import { CommentOutlined, HeartOutlined } from '@ant-design/icons'
import ButtonGroup from 'antd/lib/button/button-group'

interface PostProps {
  post: Post[]
  loading: boolean
  fetchMore: any
}

// eslint-disable-next-line react/prop-types
const ListView:FunctionComponent<PostProps> = ({ fetchMore, post, loading }) => {
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
  return <List
    className="shadow"
    loading={loading}
    itemLayout="horizontal"
    loadMore={loadMore}
    dataSource={post}
    renderItem={({ likes, images, comments, title, author: { name }, createdAt }) => (
      <List.Item>
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
      </List.Item>
    )}
  />
}

const CardView = () => {}

const Detail = () => {}

export default {
  ListView,
  CardView,
  Detail
}
