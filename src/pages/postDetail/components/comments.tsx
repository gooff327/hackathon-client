import React, { useState } from 'react'
import { Avatar, Button, Col, Collapse, Input, Row } from 'antd'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import './comment.scss'
import dayjs from 'dayjs'
import AddComment from './addComment'
import { CommentOutlined } from '@ant-design/icons'
import { QUERY_SPECIFIC_POST } from '../index'

export const COMMENT = gql`
  mutation addComment($target:ID!,$type:CommentTarget!,$content:String!,$to:ID) {
    addComment(input: {content: $content, target: $target, type:$type, to:$to}) {
      _id   
      author {
        name
      }
      type
      content
      createdAt
      replies {
        _id
      }
    }
  }
`

const Comments = ({ comments, id }: { comments: any, id: string}) => {
  const [commentList, setCommentList] = useState(comments)
  const [activeKey, setActiveKey] = useState('')

  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

  const [addComment] = useMutation(COMMENT)

  console.log(comments)

  const handleSubmit = (type:string, target:string, comment:string) => {
    console.log(type, id, comment)
    addComment({
      variables: { type, target, content: comment },
      update: (cache, { data: { addComment: comment } }) => {
        console.log(comment, 'comment')
        const data:any = cache.readQuery({ query: QUERY_SPECIFIC_POST })
        console.log('data', data)
        data.post.comments = [...data.post.comments, addComment]
        cache.writeQuery({ query: QUERY_SPECIFIC_POST, data })
      }
    })
      .then(({ data }) => {
        console.log(data)
        setActiveKey('')
      })
  }

  const handleReply = (index:string) => {
    setActiveKey(index)
  }

  const getColor = (name:string) => {
    return (name.charCodeAt(0) - 'A'.charCodeAt(0)) % 4
  }

  const onBlur = (e:any) => {
    console.log('event', e)
    e.stopPropagation()
    setActiveKey('')
  }

  return <div className={'comment'}>
    <AddComment
      onBlur={onBlur}
      handleSubmit={handleSubmit.bind(this, 'POST', id)}
    />
    <div className={'comment-list'}>
      {
        commentList && commentList.map((item:any, index:number) => <div key={index} className={'comment-item'}>
          <Row justify={'start'} gutter={[48, 12]} align={'top'}>
            <Col span={1}>
              <Avatar
                style={{
                  background: ColorList[getColor(item?.author?.name?.substr(0, 1).toUpperCase())]
                }}
                size={'large'}
              >
                {item?.author?.name?.substr(0, 1).toUpperCase()}
              </Avatar>
            </Col>
            <Col span={22} className={'comment-right'}>
              <span className={'author'}>{item?.author?.name}</span>
              <Collapse accordion ghost activeKey={activeKey} destroyInactivePanel={true}>
                <Collapse.Panel key={index + 'comment'} showArrow={false} header={
                  <span className={'comment-right-content'}>
                    <span>{ item.content}</span>
                    <span className={'reply'} onClick={handleReply.bind(null, index + 'comment')}>
                      <CommentOutlined /> 回复
                    </span>
                  </span>}>
                  <AddComment
                    handleSubmit={handleSubmit.bind(null, 'COMMENT', item._id)}
                    onBlur = {onBlur}
                  />
                </Collapse.Panel>
              </Collapse>
              <span className={'time'}>{ item.createdAt}</span>
              {
                item.replies.map((item:any, index:number) => <div key={index} className={'comment-reply'}>
                  <Row justify={'start'} gutter={[48, 12]} align={'top'}>
                    <Col span={1}>
                      <Avatar
                        style={{
                          background: ColorList[getColor(item?.author?.name?.substr(0, 1).toUpperCase())]
                        }}
                        size={'large'}
                      >
                        {item?.author?.name?.substr(0, 1).toUpperCase()}
                      </Avatar>
                    </Col>
                    <Col span={22}>
                      <span className={'author'}>{item?.author?.name}</span>
                      <Collapse accordion ghost activeKey={activeKey} destroyInactivePanel={true}>
                        <Collapse.Panel key={index + 'reply'} showArrow={false} header={
                          <span className={'comment-right-content'}>
                            <span>{ item.content}</span>
                            <span className={'reply'} onClick={handleReply.bind(null, index + 'reply')}>
                              <CommentOutlined /> 回复
                            </span>
                          </span>}>
                          <AddComment
                            handleSubmit={handleSubmit.bind(null, 'COMMENT', item._id)}
                            onBlur = {onBlur}
                          />
                        </Collapse.Panel>
                      </Collapse>
                      <span className={'time'}>{ item.createdAt}</span>
                    </Col>
                  </Row>

                </div>)
              }
            </Col>
          </Row>
        </div>)
      }
    </div>
  </div>
}

export default Comments
