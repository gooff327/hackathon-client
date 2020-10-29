import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { RouteComponentProps } from 'react-router'
import './index.scss'

const GET_USER_INFO = gql`
    query getUserInfo {
        me {
            name
            avatar
            createdAt
            email
            verified
        }
    }
`

const UserInfo = (props:any) => {
  const { loading, error, data } = useQuery(GET_USER_INFO)
  console.log(loading, error, data)
  const { goToUserProfile } = props

  return (
    <div className='user-info'>
      <div className="avatar-con">
        <img src="https://user-gold-cdn.xitu.io/2018/12/13/167a58bf6d68ece3?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1" alt=""/>
        <span onClick={goToUserProfile}>编辑</span>
      </div>
      <div className="info-con">
        <h2 className='title'>暖刺</h2>
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
          <span>长路漫漫，唯剑作伴</span>
        </div>
      </div>
    </div>
  )
}

const MainContent = () => {
  return <div className='content'>
        content
  </div>
}

const User = (props: RouteComponentProps) => {
  const goToUserProfile = () => {
    console.log('goToUserProfile')
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
