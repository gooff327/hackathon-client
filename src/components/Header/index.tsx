import React, { useEffect, useState } from 'react'
import routes from '../../constants/routes'
import { Avatar, Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import EditPostModal from '../../pages/EditPostModal'

import { useHistory } from 'react-router-dom'
import Login from '../../pages/login'

import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducers'
import { User } from '../../store/user/types'
import './style.scss'

const HeaderContent = () => {
  const [pathname, setPathname] = useState('')
  const history = useHistory()
  const user = useSelector<RootState, User>(state => state.user.me)
  useEffect(() => {
    setPathname(location.pathname)
  }, [])
  const onBtnClick = (name: string, path: any) => {
    setPathname(path)
    history.push(path)
  }
  return <div className={'header-content'}>
    {
      routes.filter(route => !route.hide).map(({ name, path }) => {
        return <Button
          key={name}
          className={pathname === path ? 'btn-active' : ''}
          type={'link'} onClick={() => onBtnClick(name, path)}
        >
          {name}
        </Button>
      }
      )
    }
    <Input placeholder={'请输入关键字'} suffix={<SearchOutlined/>}/>
    <EditPostModal/>
    {
      user ? <Avatar src={user.avatar} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{ user.name[0]}</Avatar> : <Login/>
    }
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
