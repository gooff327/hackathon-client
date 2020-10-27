import React, { FunctionComponent } from 'react'
import { Post } from '../../../../types'
import { Skeleton, List, Button } from 'antd'

interface PostProps {
  post: Post[]
  loading: boolean
  fetchMore: any
}

// eslint-disable-next-line react/prop-types
const ListView:FunctionComponent<PostProps> = ({ fetchMore, post, loading }) => {
  const loadMore = !loading
    ? (
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
    renderItem={item => (
      <List.Item>
        <Skeleton avatar title={false} loading={item.loading} active>
          <List.Item.Meta
            description={item?.author?.name}
            title={item.title}
          />
          <div>{item.createdAt}</div>
        </Skeleton>
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
