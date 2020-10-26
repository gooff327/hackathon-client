import React from 'react'
import routes from '../../constants/routes'
import { Button, Input } from 'antd'
import { SearchOutlined, FormOutlined } from '@ant-design/icons'

const HeaderContent = () => {
  return <div className={'header-content'}>
    {
      routes.filter(route => !route.hide).map(({ name, path }) =>
        <Button key={name} type={'link'} onClick={() => history.pushState(null, name, path as string)}>{name}</Button>)
    }
    <Input placeholder={'请输入关键字'} suffix={<SearchOutlined/>}/>
    <Button type={'primary'}>发布<FormOutlined/></Button>
    <Button>登录</Button>
  </div>
}
const Header = () => {
  return <div className={'header-wrapper'}>
    <header className={'fixed-header header'}>
      <HeaderContent/>
    </header>
    <header className={'header'}/>
  </div>
}

export default Header
