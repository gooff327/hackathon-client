import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { RouteComponentProps } from 'react-router'
import { Avatar, Spin } from 'antd'
import './index.scss'

const GET_USER_INFO = gql`
    query getUserInfo {
        me {
            _id
            name
            avatar
            email
            verified
            desc
        }
    }
`

const UserInfo = (props:any) => {
  const { loading, error, data } = useQuery(GET_USER_INFO)
  const { goToUserProfile } = props
  return (
    <Spin spinning={loading}>
      {
        data && <div className='user-info'>
          <div className="avatar-con">
            <Avatar
              src={data.me.avatar}
              className='avatar'
              size={80}>{data.me.name.slice(0, 1)}</Avatar>
            <span className='edit' onClick={goToUserProfile}>编辑</span>
          </div>
          <div className="info-con">
            <h2 className='title'>{data.me.name}</h2>
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
                <span className="num">0</span>
                <span className="text">文章</span>
              </div>
            </div>
            <div className="introduction">
              <h4>个人简介</h4>
              <span>{data.me.desc || '暂无'}</span>
            </div>
          </div>
        </div>
      }
    </Spin>
  )
}

const MainContent = () => {
  return <div className='content'>
        content
  </div>
}

const User = (props: RouteComponentProps) => {
  const goToUserProfile = () => {
    props.history.push('/user/profile')
  }

  return (
    <div className='user-page'>
      <div className='minor-area'>
        <UserInfo goToUserProfile={goToUserProfile}/>
      </div>
      <div className='major-area'>
        <MainContent />
      </div>
    </div>
  )
}

export default User
