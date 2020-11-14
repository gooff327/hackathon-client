import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Avatar, Button, Empty, Spin } from 'antd'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducers'
import { User } from '../../store/user/types'
import './index.scss'
import ButtonGroup from 'antd/lib/button/button-group'
import { CommentOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'

const GET_POSTS = gql`
  query getUserInfo {
    me {
      _id
      posts {
        _id
        title
        content
        images
        isPublic
        createdAt
        likes{
          _id
        }
        views
        comments {
          type
          content
        }
      }
    }
  }

`

const UserInfo = (props:any) => {
  const user = useSelector<RootState, User>(state => state.user.me)

  const { goToUserProfile } = props
  return (<div className='user-info'>
    <div className="avatar-con">
      <Avatar
        src={user.avatar}
        className='avatar'
        size={80}>{user.name.slice(0, 1)}</Avatar>
      <span className='edit' onClick={goToUserProfile}>编辑</span>
    </div>
    <div className="info-con">
      <h2 className='title'>{user.name}</h2>
      <div className='follow-block'>
        <div className="follow-item">
          <span className="num">0</span>
          <span className="text">粉丝</span>
        </div>
        <div className="follow-item">
          <span className="num">0</span>
          <span className="text">关注</span>
        </div>
        <div className="follow-item">
          <span className="num">{props?.data?.me?.posts?.length || 0}</span>
          <span className="text">文章</span>
        </div>
      </div>
      <div className="introduction">
        <h4>个人简介</h4>
        <span>{user.desc || '暂无'}</span>
      </div>
    </div>
  </div>
  )
}

const MainContent = (props: any) => {
  const { data, loading } = props
  console.log('data', data)

  const handleNavToDetail = () => {

  }
  const handleLikeBtnClick = (id: any, index: any) => {

  }

  return <div className='content'>
    <ul>
      {
        data.length === 0 && <Empty description={'暂无数据'}/>
      }
      {
        data.map((item: any, index: number) => {
          console.log(item)
          const { content, createdAt, name, _id, title, likes, comments, selfID } = item
          return <li key={index}>
            <div className={'left-panel'}>
              <div className={'top-info'}>
                <span>{createdAt}</span>
              </div>
              <h3 onClick={handleNavToDetail.bind(null, _id)}>{title}</h3>
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
                <Button
                  className={'btn-comment'}
                  type={'link'}
                  icon={<CommentOutlined/>}
                  onClick={handleNavToDetail.bind(null, _id)}
                >
                  {comments.length}
                </Button>
              </ButtonGroup>
            </div>

          </li>
        })
      }
    </ul>
  </div>
}

const UserCon = (props: RouteComponentProps) => {
  const { loading, data } = useQuery(GET_POSTS)

  const goToUserProfile = () => {
    props.history.push('/user/profile')
  }

  return (
    <div className='user-page'>
      <div className='minor-area'>
        <UserInfo data={data} goToUserProfile={goToUserProfile}/>
      </div>
      <div className='major-area'>
        {
          data && <MainContent data={data.me.posts} loading={loading}/>
        }
      </div>
    </div>
  )
}

export default UserCon
