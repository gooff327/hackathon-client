import React, { useEffect, useState } from 'react'
import routes from '../../constants/routes'
import { Avatar, Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import EditPostModal from '../../pages/EditPostModal'

import { useHistory } from 'react-router-dom'
import Login from '../../pages/login'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducers'
import { User } from '../../store/user/types'
import './style.scss'
import { PostFilter } from '../../store/home/types'
import { updateKeyword } from '../../store/home/actions'

const HeaderContent = () => {
  const [pathname, setPathname] = useState('')
  const history = useHistory()
  const user = useSelector<RootState, User>(state => state.user.me)
  const { keyword: keywordFormRedux } = useSelector<RootState, PostFilter>(state => state.home.filters)
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setPathname(location.pathname)
  }, [])
  const onBtnClick = (name: string, path: any) => {
    setPathname(path)
    history.push(path)
  }

  const onSearch = () => {
    dispatch(updateKeyword({ keyword }))
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
    <Input
      allowClear
      defaultValue={keywordFormRedux}
      placeholder={'请输入关键字'}
      suffix={<SearchOutlined onClick={onSearch}/>}
      onChange={({ target: { value } }) => setKeyword(value)}
      onPressEnter={onSearch}
    />
    <EditPostModal/>
    {
      user ? <Avatar src={user.avatar} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{user.name[0]}</Avatar>
        : <Login/>
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
