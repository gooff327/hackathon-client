import { RouteProps } from 'react-router-dom'
import { ReactElement } from 'react'
export interface Route extends RouteProps {
  icon?: ReactElement,
  name: string
  hide: boolean
}

const routes: Route[] = [
  {
    path: '/',
    name: '登录',
    hide: true
  }
]
export default routes
