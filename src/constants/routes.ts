import { RouteProps } from 'react-router-dom'
import { ReactElement } from 'react'
import Login from '../pages/login'
import Home from '../pages/home'
import User from '../pages/user'
import Profile from '../pages/user/profile'
import PostDetailPage from '../pages/postDetail'

export interface Route extends RouteProps {
  icon?: ReactElement,
  name: string
  hide: boolean
}

const routes: Route[] = [
  {
    path: '/',
    name: '首页',
    exact: true,
    component: Home,
    hide: false
  },
  {
    path: '/message',
    name: '消息',
    component: Login,
    exact: true,
    hide: false
  },
  {
    path: '/search',
    name: '搜索',
    component: Login,
    exact: true,
    hide: true
  },
  {
    path: '/user',
    name: '我的',
    exact: true,
    component: User,
    hide: false
  },
  {
    path: '/detail',
    name: '详情',
    component: PostDetailPage,
    hide: true
  },
  {
    path: '/user/profile',
    name: '个人信息',
    component: Profile,
    hide: true
  }
]
export default routes
