import React from 'react'

import './index.scss'
import { Button } from 'antd'

const Home = () => {
  const category = ['测试1', '测试2', '测试3']
  return (
    <section className={'home-wrapper'}>
      <div className={'sub-header fixed-header'}>{ category.map(item => <Button key={item} type={'link'}>{item}</Button>)}</div>
      <div className={'sub-header'}>{ category.map(item => <Button key={item} type={'link'}>{item}</Button>)}</div>
    </section>
  )
}

export default Home
