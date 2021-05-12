/**
 * 文档作者: wjun94
 * 创建时间：2019年09月22日
 * 修改时间：2019年10月12日
 * 描述信息：路由
 */
import { RouteProps } from 'react-router-dom'
import Login from '../app/login'
import App from '../app/index'

const routes: RouteProps[] = [
  {
    path: '/login',
    component: Login,
  },

  {
    path: '/',
    component: App,
  },
  /* {
        path: '',   // 路由不匹配默认跳到首页
        component: App
    }, */
]

export default routes
