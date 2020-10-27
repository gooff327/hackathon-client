import { RouteProps } from 'react-router-dom'
import { ReactElement } from 'react'
import Login from '../pages/login'
import Home from '../pages/home'
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
    path: '/me',
    name: '我的',
    component: Login,
    exact: true,
    hide: false
  }
]
export default routes
