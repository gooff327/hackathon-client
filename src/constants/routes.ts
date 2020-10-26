import { RouteProps } from 'react-router-dom'
import { ReactElement } from 'react'
import Login from '../pages/login';
export interface Route extends RouteProps {
  icon?: ReactElement,
  name: string
  hide: boolean
}

const routes: Route[] = [
  {
    path: '/',
    name: '登录',
    component: Login,
    hide: true
  }
]
export default routes
