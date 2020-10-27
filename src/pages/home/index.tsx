import React from 'react'
import { Button, Spin } from 'antd'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import './index.scss'
const GET_POSTS = gql`
    query getPosts {
        posts {
            title
        }
    }
`
const Home = () => {
  const category = ['测试1', '测试2', '测试3']
  const { loading, error, data } = useQuery(GET_POSTS)
  console.log(data, error, loading)
  return (
    <section className={'home-wrapper'}>
      <div className={'sub-header fixed-header'}>{ category.map(item => <Button key={item} type={'link'}>{item}</Button>)}</div>
      <div className={'sub-header'}>{ category.map(item => <Button key={item} type={'link'}>{item}</Button>)}</div>
      <Spin spinning={loading} delay={20}>
        { data?.posts.map((i: any) => <div key={i}>i</div>)}
      </Spin>
    </section>
  )
}

export default Home
